/**
 * CAROUSEL.JS
 * Carousel reutilizable con soporte táctil, dots y botones prev/next.
 * Uso: Carousel.init(selector, opciones)
 */

const Carousel = (function () {

  /**
   * Inicializa un carousel.
   * @param {string} wrapperId - ID del elemento contenedor del carousel
   * @param {Object} options
   * @param {number} options.slidesVisible - Slides visibles (default: 3)
   * @param {boolean} options.autoplay - Autoplay activado (default: false)
   * @param {number} options.autoplayDelay - ms entre slides (default: 4000)
   * @param {boolean} options.loop - Loop infinito (default: true)
   */
  function init(wrapperId, options = {}) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const config = {
      autoplay:      options.autoplay      ?? false,
      autoplayDelay: options.autoplayDelay ?? 4500,
      loop:          options.loop          ?? true,
      gap:           options.gap           ?? 16,
    };

    const track    = wrapper.querySelector('.carousel__track');
    const prevBtn  = wrapper.querySelector('[data-carousel-prev]');
    const nextBtn  = wrapper.querySelector('[data-carousel-next]');
    const dotsWrap = wrapper.querySelector('.carousel__dots');
    const slides   = Array.from(track ? track.children : []);

    if (!track || !slides.length) return;

    let current     = 0;
    let autoplayTimer = null;
    let isDragging  = false;
    let dragStartX  = 0;
    let dragOffset  = 0;

    // ── Calcular cuántos slides caben ──────────────────────────

    function getSlidesVisible() {
      const w = wrapper.offsetWidth;
      if (w < 480)  return 1;
      if (w < 768)  return Math.min(2, slides.length);
      if (w < 1024) return Math.min(3, slides.length);
      return Math.min(options.slidesVisible ?? 3, slides.length);
    }

    function getSlideWidth() {
      const visible = getSlidesVisible();
      return (wrapper.offsetWidth - config.gap * (visible - 1)) / visible;
    }

    // ── Posición objetivo ──────────────────────────────────────

    function getTargetX(index) {
      const sw = getSlideWidth() + config.gap;
      return -(index * sw);
    }

    // ── Render ─────────────────────────────────────────────────

    function updateSlideWidths() {
      const sw = getSlideWidth();
      slides.forEach(slide => {
        slide.style.width = `${sw}px`;
        slide.style.marginRight = `${config.gap}px`;
      });
    }

    function goTo(index) {
      const max = config.loop
        ? slides.length - getSlidesVisible()
        : slides.length - getSlidesVisible();

      if (index < 0) {
        current = config.loop ? max : 0;
      } else if (index > max) {
        current = config.loop ? 0 : max;
      } else {
        current = index;
      }

      track.style.transform = `translateX(${getTargetX(current)}px)`;
      updateDots();
      updateButtons();
    }

    function updateDots() {
      if (!dotsWrap) return;
      const dots = dotsWrap.querySelectorAll('.carousel__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function updateButtons() {
      if (!prevBtn || !nextBtn) return;
      const max = slides.length - getSlidesVisible();
      if (!config.loop) {
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= max;
      }
    }

    function buildDots() {
      if (!dotsWrap) return;
      const max = slides.length - getSlidesVisible() + 1;
      dotsWrap.innerHTML = '';
      for (let i = 0; i < max; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
        dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
        dotsWrap.appendChild(dot);
      }
    }

    // ── Controles ──────────────────────────────────────────────

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

    // ── Teclado ────────────────────────────────────────────────

    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { prev(); resetAutoplay(); }
      if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
    });

    // ── Touch / Drag ───────────────────────────────────────────

    function onDragStart(x) {
      isDragging = true;
      dragStartX = x;
      track.style.transition = 'none';
    }

    function onDragMove(x) {
      if (!isDragging) return;
      dragOffset = x - dragStartX;
      track.style.transform = `translateX(${getTargetX(current) + dragOffset}px)`;
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';

      const threshold = getSlideWidth() * 0.25;
      if (dragOffset < -threshold) next();
      else if (dragOffset > threshold) prev();
      else goTo(current);

      dragOffset = 0;
      resetAutoplay();
    }

    track.addEventListener('mousedown',  e => onDragStart(e.clientX));
    track.addEventListener('mousemove',  e => { e.preventDefault(); onDragMove(e.clientX); });
    track.addEventListener('mouseup',    onDragEnd);
    track.addEventListener('mouseleave', onDragEnd);

    track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
    track.addEventListener('touchend',   onDragEnd);

    // ── Autoplay ───────────────────────────────────────────────

    function startAutoplay() {
      if (!config.autoplay) return;
      autoplayTimer = setInterval(next, config.autoplayDelay);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pausar en hover
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', () => { if (config.autoplay) startAutoplay(); });

    // ── Resize ─────────────────────────────────────────────────

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSlideWidths();
        buildDots();
        goTo(current);
      }, 200);
    });

    // ── Inicialización ─────────────────────────────────────────

    updateSlideWidths();
    buildDots();
    goTo(0);
    startAutoplay();
  }

  return { init };
})();
