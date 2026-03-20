/**
 * "More" menu on home action buttons: toggles visibility per action (Figma 1618:109030).
 * Expects [data-fa-home-actions-container] with trigger, panel, and [data-fa-action] targets.
 */
(function () {
  var LS_KEY = 'fa-home-actions-visibility';

  function closeMoveMoneyIfOpen() {
    var mm = document.getElementById('fa-move-money-dropdown');
    var mmb = document.getElementById('fa-move-money-btn');
    if (mm && mm.classList.contains('is-open')) {
      mm.classList.remove('is-open');
      mm.setAttribute('aria-hidden', 'true');
      if (mmb) mmb.setAttribute('aria-expanded', 'false');
    }
  }

  function initHomeActionsMoreBar(container) {
    if (container.getAttribute('data-fa-home-actions-more-initialized') === 'true') return;
    var trigger = container.querySelector('[data-fa-home-actions-more-trigger]');
    var panel = container.querySelector('[data-fa-home-actions-more-panel]');
    if (!trigger || !panel) return;
    container.setAttribute('data-fa-home-actions-more-initialized', 'true');

    var rows = panel.querySelectorAll('[data-fa-action-target]');

    function getDefaultState() {
      var o = {};
      rows.forEach(function (row) {
        var k = row.getAttribute('data-fa-action-target');
        if (k) o[k] = true;
      });
      return o;
    }

    function loadPersisted() {
      try {
        var raw = localStorage.getItem(LS_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return null;
    }

    function saveState(state) {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      } catch (e) {}
    }

    var visibility = getDefaultState();
    var persisted = loadPersisted();
    if (persisted && typeof persisted === 'object') {
      Object.keys(visibility).forEach(function (k) {
        if (persisted[k] === false) visibility[k] = false;
      });
    }

    function setTargetHidden(key, hidden) {
      var el = container.querySelector('[data-fa-action="' + key + '"]');
      if (!el) return;
      el.classList.toggle('fa-home-action--hidden', hidden);
      if (hidden) {
        el.setAttribute('hidden', '');
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('hidden');
        el.removeAttribute('aria-hidden');
      }
    }

    function syncRow(row) {
      var key = row.getAttribute('data-fa-action-target');
      if (!key) return;
      var on = visibility[key] !== false;
      row.setAttribute('aria-checked', on ? 'true' : 'false');
    }

    Object.keys(visibility).forEach(function (k) {
      if (visibility[k] === false) setTargetHidden(k, true);
    });
    rows.forEach(syncRow);

    function openPanel(open) {
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    rows.forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var key = row.getAttribute('data-fa-action-target');
        if (!key) return;
        var currentlyOn = row.getAttribute('aria-checked') === 'true';
        var nextOn = !currentlyOn;
        visibility[key] = nextOn;
        saveState(visibility);
        setTargetHidden(key, !nextOn);
        row.setAttribute('aria-checked', nextOn ? 'true' : 'false');
        if (key === 'move-money' && !nextOn) closeMoveMoneyIfOpen();
      });
    });

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !panel.classList.contains('is-open');
      openPanel(open);
    });

    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) openPanel(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) openPanel(false);
    });

    window.__faHomeActionsCloseMore = function () {
      openPanel(false);
    };
  }

  function boot() {
    document.querySelectorAll('[data-fa-home-actions-container]').forEach(initHomeActionsMoreBar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
