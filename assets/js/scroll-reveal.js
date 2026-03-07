/**
 * SCROLL-REVEAL.JS
 * Observa elementos con clase .reveal/.reveal-left/.reveal-right
 * y los anima cuando entran en el viewport.
 */

const ScrollReveal = (function () {

  function init() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!targets.length) return;

    // Soporte reducido para usuarios que prefieren menos movimiento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Una sola vez
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    targets.forEach(el => observer.observe(el));
  }

  return { init };
})();
