(() => {
  'use strict';
  const items = [...document.querySelectorAll('.work-item')];
  const previews = [...document.querySelectorAll('.project-preview')];
  const inlineMode = window.matchMedia('(max-width: 1000px), (hover: none)');
  let hovered = null;
  let focused = null;
  let active = null;
  function loadImage(img) {
    if (!img || img.getAttribute('src')) return;
    img.src = img.dataset.src;
  }
  function updatePreview() {
    const next = inlineMode.matches ? null : (hovered || focused);
    if (active === next) return;
    active = next;
    items.forEach(item => item.classList.toggle('is-active', item.dataset.project === active));
    previews.forEach(preview => {
      const visible = preview.dataset.preview === active;
      if (visible) {
        const img = preview.querySelector('img');
        img.loading = 'eager';
        loadImage(img);
      }
      preview.classList.toggle('is-visible', visible);
    });
  }
  items.forEach(item => {
    const link = item.querySelector('.project-link');
    link.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = item.dataset.project;
      updatePreview();
    });
    link.addEventListener('pointerleave', () => {
      hovered = null;
      updatePreview();
    });
    link.addEventListener('focus', () => {
      focused = item.dataset.project;
      updatePreview();
    });
    link.addEventListener('blur', () => {
      focused = null;
      updatePreview();
    });
  });
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && inlineMode.matches) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px 0px' }) : null;
  function setMode() {
    hovered = null;
    updatePreview();
    if (inlineMode.matches) {
      items.forEach(item => {
        const img = item.querySelector('.inline-preview > img');
        if (observer) observer.observe(img);
        else loadImage(img);
      });
    } else if (observer) {
      observer.disconnect();
    }
  }
  if (inlineMode.addEventListener) inlineMode.addEventListener('change', setMode);
  else inlineMode.addListener(setMode);
  setMode();
})();
