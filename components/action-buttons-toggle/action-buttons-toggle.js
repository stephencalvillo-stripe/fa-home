/**
 * V2: floating "Action buttons" switch — hides #fa-welcome-actions, persists in sessionStorage.
 */
(function () {
  var STORAGE_KEY = 'fa-welcome-actions-bar-visible';

  function getBtn() {
    return document.getElementById('fa-action-buttons-toggle-btn');
  }

  function readStoredVisible() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== '0';
    } catch (e) {
      return true;
    }
  }

  function writeStoredVisible(show) {
    try {
      sessionStorage.setItem(STORAGE_KEY, show ? '1' : '0');
    } catch (e) {}
  }

  function closeMoveMoneyIfOpen() {
    var mm = document.getElementById('fa-move-money-dropdown');
    var mmb = document.getElementById('fa-move-money-btn');
    if (mm && mm.classList.contains('is-open')) {
      mm.classList.remove('is-open');
      mm.setAttribute('aria-hidden', 'true');
      if (mmb) mmb.setAttribute('aria-expanded', 'false');
    }
  }

  function applyBarVisible(show) {
    var body = document.body;
    var btn = getBtn();
    if (body.getAttribute('data-prototype-version') !== '2') {
      body.removeAttribute('data-fa-welcome-actions-bar');
      if (btn) btn.setAttribute('aria-checked', 'true');
      return;
    }
    var visible = !!show;
    body.setAttribute('data-fa-welcome-actions-bar', visible ? 'true' : 'false');
    if (btn) {
      btn.setAttribute('aria-checked', visible ? 'true' : 'false');
    }
    if (!visible) {
      closeMoveMoneyIfOpen();
      if (typeof window.__faHomeActionsCloseMore === 'function') {
        window.__faHomeActionsCloseMore();
      }
    }
  }

  window.__faSyncWelcomeActionsBarForVersion = function (version) {
    if (String(version) !== '2') {
      document.body.removeAttribute('data-fa-welcome-actions-bar');
      var b = getBtn();
      if (b) b.setAttribute('aria-checked', 'true');
      return;
    }
    applyBarVisible(readStoredVisible());
  };

  var btn = getBtn();
  if (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-checked') === 'true';
      var next = !on;
      writeStoredVisible(next);
      applyBarVisible(next);
    });
  }

  window.__faSyncWelcomeActionsBarForVersion(document.body.getAttribute('data-prototype-version') || '1');
})();
