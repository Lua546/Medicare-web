/**
 * COUNTER — Animated number counters using IntersectionObserver
 */

const Counter = (() => {

  function init() {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  function onIntersect(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      animate(el);
      observer.unobserve(el);
    });
  }

  function animate(el) {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = (value >= 1000 ? value.toLocaleString('es') : value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  return { init };

})();
