/* Reading progress shared by the homepage and case-study navbar. */
(() => {
  if (!document.querySelector('.portfolio-navbar') || document.querySelector('[data-portfolio-progress]')) return;
  const progress = document.createElement('div');
  progress.className = 'portfolio-navbar-progress';
  progress.setAttribute('data-portfolio-progress', '');
  progress.setAttribute('aria-hidden', 'true');
  const bar = document.createElement('div');
  bar.className = 'portfolio-navbar-progress__bar';
  progress.append(bar);
  document.body.prepend(progress);
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const root = document.scrollingElement || document.documentElement;
    const navbar = document.querySelector('.portfolio-navbar');
    document.documentElement.style.setProperty('--portfolio-header-height', navbar.getBoundingClientRect().height + 'px');
    const maximum = root.scrollHeight - window.innerHeight;
    const fraction = maximum > 0 ? Math.max(0, Math.min(1, root.scrollTop / maximum)) : 0;
    bar.style.transform = `scaleX(${fraction})`;
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(document.documentElement);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  update();
})();
