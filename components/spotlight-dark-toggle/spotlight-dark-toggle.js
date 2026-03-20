/**
 * V2: "Spotlight dark mode" switch — sets body[data-fa-spotlight-dark] for spotlight CSS; persists in sessionStorage.
 */
(function () {
  var STORAGE_KEY = 'fa-spotlight-dark-mode';

  function getBtn() {
    return document.getElementById('fa-spotlight-dark-toggle-btn');
  }

  function readStoredDark() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function writeStoredDark(on) {
    try {
      sessionStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch (e) {}
  }

  function applySpotlightDark(on) {
    var body = document.body;
    var btn = getBtn();
    if (body.getAttribute('data-prototype-version') !== '2') {
      body.removeAttribute('data-fa-spotlight-dark');
      if (btn) btn.setAttribute('aria-checked', 'false');
      return;
    }
    var enabled = !!on;
    if (enabled) {
      body.setAttribute('data-fa-spotlight-dark', 'true');
    } else {
      body.removeAttribute('data-fa-spotlight-dark');
    }
    if (btn) {
      btn.setAttribute('aria-checked', enabled ? 'true' : 'false');
    }
  }

  window.__faSyncSpotlightDarkToggleForVersion = function (version) {
    if (String(version) !== '2') {
      document.body.removeAttribute('data-fa-spotlight-dark');
      var b = getBtn();
      if (b) b.setAttribute('aria-checked', 'false');
      return;
    }
    applySpotlightDark(readStoredDark());
  };

  var btn = getBtn();
  if (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-checked') === 'true';
      var next = !on;
      writeStoredDark(next);
      applySpotlightDark(next);
    });
  }

  window.__faSyncSpotlightDarkToggleForVersion(document.body.getAttribute('data-prototype-version') || '1');
})();
