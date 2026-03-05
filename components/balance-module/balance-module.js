/**
 * Total balance module — interactive line chart hover
 * Dot follows cursor x (stays on line); balance and date update from data.
 */
(function () {
  var VIEWBOX = { w: 470, h: 162 };

  // Full dataset: Dec 1–31, one point per day; overall up-and-right with peaks and valleys
  var balanceDataFull = (function () {
    var days = [];
    var base = 65200;
    var trend = 2400;
    for (var d = 1; d <= 31; d++) {
      var t = (d - 1) / 30;
      var trendVal = base + trend * t;
      var wave = Math.sin(t * Math.PI * 3) * 800 + Math.sin(t * Math.PI * 5) * 400;
      var total = Math.round((trendVal + wave) * 100) / 100;
      var usd = Math.round(total * (0.38 + 0.04 * Math.sin(d * 0.5)) * 100) / 100;
      var eur = Math.round(total * (0.4 - 0.02 * Math.cos(d * 0.3)) * 100) / 100;
      var gbp = Math.round((total - usd - eur) * 100) / 100;
      days.push({
        date: 'Dec ' + d,
        total: total,
        usd: usd,
        eur: eur,
        gbp: gbp
      });
    }
    return days;
  })();

  var minTotal = 64000;
  var maxTotal = 76000;

  function toY(value) {
    return VIEWBOX.h - 20 - ((value - minTotal) / (maxTotal - minTotal)) * (VIEWBOX.h - 40);
  }

  function buildPathD(data) {
    var arr = data || balanceDataFull;
    var n = arr.length;
    if (n === 0) return 'M0,81';
    if (n === 1) return 'M0,' + toY(arr[0].total);
    var d = arr.map(function (p, i) {
      var x = (i / (n - 1)) * VIEWBOX.w;
      var y = toY(p.total);
      return (i === 0 ? 'M' : 'L') + x + ',' + y;
    });
    return d.join(' ');
  }

  function formatMoney(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function initModule(module) {
    var chart = module.querySelector('.fa-balance-chart');
    var inner = chart && chart.querySelector('.fa-balance-chart-inner');
    if (!inner) return;

    var pathEl = inner.querySelector('.fa-balance-line path');
    var hoverEl = inner.querySelector('.fa-balance-chart-hover');
    var dotEl = inner.querySelector('.fa-balance-chart-hover-dot');
    var lineEl = inner.querySelector('.fa-balance-chart-hover-line');
    var valueEl = module.querySelector('.fa-balance-value');
    var dateLabel = module.querySelector('.fa-balance-dropdown-label--regular');
    var breakdownEl = module.querySelector('.fa-balance-breakdown');
    var timerangeStart = module.querySelector('.fa-balance-timerange span:first-child');
    var timerangeEnd = module.querySelector('.fa-balance-timerange span:last-child');
    if (!pathEl || !hoverEl || !dotEl || !lineEl || !valueEl || !dateLabel || !breakdownEl) return;

    var currentRangeDays = 30;
    var currentRangeLabel = 'Last 30 days';
    function getVisibleData() {
      return balanceDataFull.slice(-currentRangeDays);
    }

    function applyRange(days, rangeLabel) {
      currentRangeDays = days;
      if (rangeLabel) currentRangeLabel = rangeLabel;
      var data = getVisibleData();
      pathEl.setAttribute('d', buildPathD(data));
      if (timerangeStart && data.length) timerangeStart.textContent = data[0].date;
      if (timerangeEnd && data.length) timerangeEnd.textContent = data[data.length - 1].date;
      setValues(data[data.length - 1]);
      if (dateLabel) dateLabel.textContent = currentRangeLabel;
    }

    pathEl.setAttribute('d', buildPathD(getVisibleData()));
    if (timerangeStart) timerangeStart.textContent = getVisibleData()[0].date;
    if (timerangeEnd) timerangeEnd.textContent = getVisibleData()[getVisibleData().length - 1].date;
    if (dateLabel) dateLabel.textContent = currentRangeLabel;


    function setValues(point) {
      valueEl.textContent = '$' + formatMoney(point.total);
      dateLabel.textContent = point.date;
      var spans = breakdownEl.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].textContent = '$' + formatMoney(point.usd) + ' USD';
        spans[1].textContent = '€' + formatMoney(point.eur) + ' EUR';
        spans[2].textContent = '£' + formatMoney(point.gbp) + ' GBP';
      }
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // Snap to nearest day: return that day's data point and exact path position for dot-on-line
    function getPointAtX(xFraction) {
      var data = getVisibleData();
      var n = data.length;
      if (n === 0) return { point: { date: '', total: 0, usd: 0, eur: 0, gbp: 0 }, x: VIEWBOX.w / 2, y: VIEWBOX.h / 2 };
      if (xFraction <= 0) return { point: data[0], x: 0, y: toY(data[0].total) };
      if (xFraction >= 1) return { point: data[n - 1], x: VIEWBOX.w, y: toY(data[n - 1].total) };
      var i = Math.round(xFraction * (n - 1));
      i = Math.max(0, Math.min(i, n - 1));
      var p = data[i];
      var x = (i / (n - 1)) * VIEWBOX.w;
      var y = toY(p.total);
      return { point: p, x: x, y: y };
    }

    function getPathPointAtX(xFraction) {
      if (!pathEl.getTotalLength) return getPointAtX(xFraction);
      var data = getVisibleData();
      var n = data.length;
      if (n <= 1) return getPointAtX(xFraction);
      var len = pathEl.getTotalLength();
      var at = xFraction * len;
      var pt = pathEl.getPointAtLength(at);
      var i = (xFraction <= 0) ? 0 : (xFraction >= 1) ? n - 1 : Math.round(xFraction * (n - 1));
      i = Math.max(0, Math.min(i, n - 1));
      return { point: data[i], x: pt.x, y: pt.y };
    }

    var tracker = document.createElement('div');
    tracker.className = 'fa-balance-chart-tracker';
    tracker.setAttribute('aria-hidden', 'true');
    inner.appendChild(tracker);

    tracker.addEventListener('mousemove', function (e) {
      var rect = tracker.getBoundingClientRect();
      var xFraction = (e.clientX - rect.left) / rect.width;
      xFraction = Math.max(0, Math.min(1, xFraction));
      var result = getPathPointAtX(xFraction);
      var xPct = (result.x / VIEWBOX.w) * 100;
      var yPct = (1 - result.y / VIEWBOX.h) * 100;

      dotEl.style.left = xPct + '%';
      dotEl.style.top = yPct + '%';
      dotEl.style.transform = 'translate(-50%, -50%)';
      lineEl.style.left = xPct + '%';
      lineEl.style.top = yPct + '%';
      lineEl.style.height = (100 - yPct) + '%';
      lineEl.style.transform = 'translateX(-50%)';

      hoverEl.style.opacity = '1';
      setValues(result.point);
    });

    tracker.addEventListener('mouseleave', function () {
      hoverEl.style.opacity = '0';
      setValues(getVisibleData()[getVisibleData().length - 1]);
      dateLabel.textContent = currentRangeLabel;
    });

    setValues(getVisibleData()[getVisibleData().length - 1]);

    // Time range dropdown: change chart range; default "Last 30 days"
    var timeTrigger = module.querySelector('.fa-balance-dropdown--time');
    var timePanel = module.querySelector('.fa-balance-dropdown-panel--time');
    if (timeTrigger && timePanel) {
      var timeItems = timePanel.querySelectorAll('.fa-balance-dropdown-item');
      timeItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var days = parseInt(item.getAttribute('data-days'), 10);
          var label = item.textContent.trim();
          if (!isNaN(days) && label) {
            applyRange(days, label);
            timePanel.querySelectorAll('.fa-balance-dropdown-item--selected').forEach(function (s) { s.classList.remove('fa-balance-dropdown-item--selected'); });
            item.classList.add('fa-balance-dropdown-item--selected');
            timePanel.classList.remove('fa-balance-dropdown-panel--open');
            timeTrigger.setAttribute('aria-expanded', false);
            timePanel.setAttribute('aria-hidden', true);
          }
        });
      });
    }

    // Total balance dropdown — click to open/close; select item updates label
    var balanceTrigger = module.querySelector('.fa-balance-dropdown--balance');
    var balancePanel = module.querySelector('.fa-balance-dropdown-panel--balance');
    if (balanceTrigger && balancePanel) {
      balancePanel.addEventListener('click', function (e) { e.stopPropagation(); });
      balanceTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = balancePanel.classList.toggle('fa-balance-dropdown-panel--open');
        balanceTrigger.setAttribute('aria-expanded', open);
        balancePanel.setAttribute('aria-hidden', !open);
        if (timePanel) timePanel.classList.remove('fa-balance-dropdown-panel--open');
        if (timeTrigger) timeTrigger.setAttribute('aria-expanded', false);
        if (timePanel) timePanel.setAttribute('aria-hidden', true);
      });
      balancePanel.querySelectorAll('.fa-balance-dropdown-item').forEach(function (item) {
        item.addEventListener('click', function () {
          balancePanel.querySelectorAll('.fa-balance-dropdown-item--selected').forEach(function (s) { s.classList.remove('fa-balance-dropdown-item--selected'); });
          item.classList.add('fa-balance-dropdown-item--selected');
          balancePanel.classList.remove('fa-balance-dropdown-panel--open');
          balanceTrigger.setAttribute('aria-expanded', false);
          balancePanel.setAttribute('aria-hidden', true);
        });
      });
    }
    if (timeTrigger && timePanel) {
      timePanel.addEventListener('click', function (e) { e.stopPropagation(); });
      timeTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = timePanel.classList.toggle('fa-balance-dropdown-panel--open');
        timeTrigger.setAttribute('aria-expanded', open);
        timePanel.setAttribute('aria-hidden', !open);
        if (balancePanel) balancePanel.classList.remove('fa-balance-dropdown-panel--open');
        if (balanceTrigger) balanceTrigger.setAttribute('aria-expanded', false);
        if (balancePanel) balancePanel.setAttribute('aria-hidden', true);
      });
    }

    function closeDropdowns() {
      if (balancePanel) balancePanel.classList.remove('fa-balance-dropdown-panel--open');
      if (timePanel) timePanel.classList.remove('fa-balance-dropdown-panel--open');
    }
    document.addEventListener('click', closeDropdowns);
  }

  function init() {
    var modules = document.querySelectorAll('.fa-balance-module');
    modules.forEach(initModule);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
