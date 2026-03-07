/**
 * WHATSAPP.JS
 * Maneja el botón flotante de WhatsApp y el botón Back to Top.
 */

const WhatsApp = (function () {

  function init() {
    const waFloat  = document.getElementById('whatsapp-float');
    const backTop  = document.getElementById('back-to-top');

    // Back to Top
    if (backTop) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const show = window.scrollY > 400;
            backTop.classList.toggle('visible', show);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // WhatsApp - mostrar/ocultar basado en scroll
    if (waFloat) {
      setTimeout(() => {
        waFloat.style.opacity = '1';
        waFloat.style.transform = 'translateY(0)';
      }, 1500);
    }
  }

  return { init };
})();
