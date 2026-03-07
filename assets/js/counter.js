/**
 * COUNTER.JS
 * Anima contadores numéricos cuando entran en el viewport.
 * Busca elementos con atributo data-target="número" y data-suffix="+"
 */

const Counter = (function () {

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = target > 1000 ? 2000 : 1500;
    const start   = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = Math.round(eased * target);

      el.textContent = current.toLocaleString('es-PY') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('es-PY') + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        el.textContent = target.toLocaleString('es-PY') + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
  }

  return { init };
})();
