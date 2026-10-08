(() => {
  'use strict';
  const normalise = pathname => pathname.replace(/\/index\.html$/i, '/').replace(/\/+$/, '') || '/';
  const current = normalise(window.location.pathname);
  document.querySelectorAll('[data-portfolio-footer]').forEach(footer => {
    footer.querySelectorAll('[data-project-link]').forEach(link => {
      const destination = new URL(link.href, document.baseURI);
      const isCurrent = destination.origin === window.location.origin && normalise(destination.pathname) === current;
      link.closest('li').hidden = isCurrent;
    });
  });
})();
