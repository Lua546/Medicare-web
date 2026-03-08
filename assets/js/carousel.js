/**
 * CAROUSEL — Reusable testimonios carousel with touch/swipe support
 */

const Carousel = (() => {

  function init() {
    initTestimoniosCarousel();
  }

  function initTestimoniosCarousel() {
    if (!window.SITE_CONFIG) return;
    const data = SITE_CONFIG.testimonios;
    if (!data || !data.length) return;

    let current = 0;
    let autoTimer = null;

    const textEl   = document.getElementById('testi-text');
    const authorEl = document.getElementById('testi-author');
    const cargoEl  = document.getElementById('testi-cargo');
    const starsEl  = document.getElementById('testi-stars');
    const prevBtn  = document.getElementById('testi-prev');
    const nextBtn  = document.getElementById('testi-next');

    if (!textEl) return;

    function show(idx, dir = 1) {
      current = ((idx % data.length) + data.length) % data.length;
      const t = data[current];

      // Fade out
      [textEl, authorEl].forEach(el => {
        if (el) { el.style.opacity = '0'; el.style.transform = `translateY(${dir * 8}px)`; }
      });

      setTimeout(() => {
        if (textEl)   textEl.textContent   = `"${t.texto}"`;
        if (authorEl) authorEl.textContent = t.nombre;
        if (cargoEl)  cargoEl.textContent  = t.cargo;
        if (starsEl) {
          starsEl.innerHTML = Array.from({ length: t.calificacion }, () =>
            `<svg class="testi-card__star" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>`
          ).join('');
        }
        // Fade in
        [textEl, authorEl].forEach(el => {
          if (el) {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      }, 220);

      resetAuto();
    }

    function next() { show(current + 1, 1); }
    function prev() { show(current - 1, -1); }

    function startAuto() {
      autoTimer = setInterval(next, 6000);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Touch / swipe on the card
    const card = document.getElementById('testi-card');
    if (card) {
      let startX = 0;
      card.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      card.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
      }, { passive: true });
    }

    // Init
    show(0);
    startAuto();
  }

  return { init };

})();
