/**
 * SCROLL REVEAL — IntersectionObserver-based reveal animations
 */

const ScrollReveal = (() => {

  let observer;

  function init() {
    observer = new IntersectionObserver(onIntersect, {
      threshold: 0.10,
      rootMargin: '0px 0px -40px 0px',
    });
    observe();
  }

  function observe() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }

  // Call this after dynamic content is injected
  function refresh() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  return { init, refresh };

})();
