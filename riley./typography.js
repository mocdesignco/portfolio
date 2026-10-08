/* Keep heading word groups inside their columns and align narrative copy. */
(() => {
  const headings = [...document.querySelectorAll('main h2, main h3')];
  const grids = [...document.querySelectorAll('.section-copy, .ai-text-grid')];
  let pending = false;
  const update = () => {
    pending = false;
    headings.forEach(heading => {
      heading.style.removeProperty('font-size');
      const groups = [...heading.querySelectorAll('.type-word-group')];
      const width = heading.clientWidth;
      const widest = Math.max(0, ...groups.map(group => group.getBoundingClientRect().width));
      if (width > 0 && widest > width) {
        const size = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = Math.floor(size * width / widest * .98) + 'px';
      }
    });
    grids.forEach(grid => {
      const left = grid.firstElementChild;
      const heading = left?.querySelector('h2');
      if (!heading) return;
      const offset = heading.getBoundingClientRect().top - left.getBoundingClientRect().top;
      grid.style.setProperty('--copy-heading-offset', Math.max(0, offset) + 'px');
    });
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };
  addEventListener('resize', schedule, { passive: true });
  addEventListener('load', schedule, { once: true });
  if (document.fonts?.ready) document.fonts.ready.then(schedule);
  update();
})();
