/* Optional analytics. Never request Clarity before an explicit opt-in. */
(() => {
  'use strict';
  if (window.__portfolioAnalyticsReady) return;
  window.__portfolioAnalyticsReady = true;
  const storageKey = 'moc-portfolio-analytics-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const siteRoot = new URL('../', document.currentScript.src);
  const privacyUrl = new URL('privacy/', siteRoot).href;
  let preference = readPreference();
  let trackerRequested = false;
  let returnFocus = null;

  function readPreference() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      const age = Date.now() - saved?.updatedAt;
      return saved?.version === 1 && typeof saved.accepted === 'boolean' &&
        Number.isFinite(age) && age >= 0 && age < lifetime ? saved : null;
    } catch (_) { return null; }
  }

  function remember(accepted) {
    preference = { version: 1, accepted, updatedAt: Date.now() };
    try { localStorage.setItem(storageKey, JSON.stringify(preference)); } catch (_) {}
  }

  function consent(accepted) {
    if (typeof window.clarity === 'function') window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: accepted ? 'granted' : 'denied'
    });
  }

  function startTracking() {
    if (!preference?.accepted || trackerRequested) return;
    trackerRequested = true;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    consent(true);
    const tag = document.createElement('script');
    tag.id = 'portfolio-clarity-tag';
    tag.async = true;
    tag.src = 'https://www.clarity.ms/tag/z272gi9258';
    document.head.appendChild(tag);
  }

  function eraseFirstPartyCookies() {
    const host = window.location.hostname;
    const domains = ['', host, '.' + host];
    const labels = host.split('.');
    for (let i = 1; i < labels.length - 1; i++) domains.push('.' + labels.slice(i).join('.'));
    const paths = new Set(['/']);
    let path = '';
    window.location.pathname.split('/').filter(Boolean).forEach(part => {
      path += '/' + part;
      paths.add(path);
      paths.add(path + '/');
    });
    ['_clck', '_clsk'].forEach(name => paths.forEach(cookiePath => domains.forEach(domain => {
      try {
        document.cookie = name + '=; Max-Age=0; Path=' + cookiePath +
          (domain ? '; Domain=' + domain : '') + '; SameSite=Lax; Secure';
      } catch (_) {}
    })));
  }

  function stopTracking() {
    if (typeof window.clarity === 'function') {
      consent(false);
      window.clarity('stop');
    }
    document.getElementById('portfolio-clarity-tag')?.remove();
    eraseFirstPartyCookies();
  }

  const banner = document.createElement('section');
  banner.className = 'analytics-banner';
  banner.setAttribute('aria-label', 'Optional analytics');
  banner.setAttribute('data-clarity-mask', 'true');
  banner.hidden = true;
  banner.innerHTML = '<div class="analytics-banner__copy"><h2>Optional analytics</h2>' +
    '<p>With your permission, I use Microsoft Clarity to see which pages people visit, where they click and how far they scroll. It helps me improve this portfolio. <a href="' + privacyUrl + '">Privacy details</a>.</p></div>' +
    '<div class="analytics-banner__actions"><button type="button" data-analytics-decline>Decline</button>' +
    '<button type="button" data-analytics-accept>Accept analytics</button></div>' +
    '<button type="button" class="analytics-banner__close" aria-label="Close analytics preferences" hidden>×</button>';
  document.body.appendChild(banner);
  const accept = banner.querySelector('[data-analytics-accept]');
  const decline = banner.querySelector('[data-analytics-decline]');
  const close = banner.querySelector('.analytics-banner__close');

  function updateStatus() {
    document.querySelectorAll('[data-analytics-status]').forEach(el => {
      el.textContent = preference ?
        (preference.accepted ? 'Your current choice: analytics accepted.' : 'Your current choice: analytics declined.') :
        'Analytics is off until you accept.';
    });
    close.hidden = !preference;
  }

  function showPreferences(moveFocus) {
    updateStatus();
    banner.hidden = false;
    if (moveFocus) {
      returnFocus = document.activeElement;
      decline.focus({ preventScroll: true });
    }
  }

  function hidePreferences() {
    banner.hidden = true;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }

  function choose(accepted) {
    const wasRunning = trackerRequested;
    remember(accepted);
    updateStatus();
    hidePreferences();
    if (accepted) startTracking();
    else {
      stopTracking();
      // Reload prevents a previously downloaded tag from continuing in memory.
      if (wasRunning) window.location.reload();
    }
  }

  accept.addEventListener('click', () => choose(true));
  decline.addEventListener('click', () => choose(false));
  close.addEventListener('click', hidePreferences);
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-analytics-preferences]');
    if (!link) return;
    event.preventDefault();
    showPreferences(true);
  });
  banner.addEventListener('keydown', event => {
    if (event.key === 'Escape' && preference) hidePreferences();
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    const wasRunning = trackerRequested;
    preference = readPreference();
    updateStatus();
    if (preference?.accepted) { hidePreferences(); startTracking(); }
    else {
      stopTracking();
      if (wasRunning) window.location.reload();
      else if (!preference) showPreferences(false);
      else hidePreferences();
    }
  });

  updateStatus();
  if (preference?.accepted) startTracking();
  else {
    eraseFirstPartyCookies();
    if (!preference) showPreferences(false);
  }
})();
