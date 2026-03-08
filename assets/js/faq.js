/**
 * FAQ — Accordion with single-open behavior
 */

const FAQ = (() => {

  function init() {
    // Use event delegation on the grid
    const grid = document.getElementById('faq-grid');
    if (!grid) return;
    grid.addEventListener('click', e => {
      const item = e.target.closest('.faq-item');
      if (!item) return;
      toggle(item, grid);
    });
  }

  function toggle(item, grid) {
    const isOpen = item.classList.contains('open');
    // Close all
    grid.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // Open clicked (unless it was already open)
    if (!isOpen) item.classList.add('open');
  }

  return { init };

})();
