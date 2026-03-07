/**
 * FAQ.JS
 * Accordion accesible para preguntas frecuentes.
 * Solo un ítem puede estar abierto a la vez (configurable).
 */

const FAQ = (function () {

  function init(onlyOne = true) {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        if (onlyOne) {
          // Cerrar todos
          faqItems.forEach(i => {
            i.classList.remove('open');
            const t = i.querySelector('.faq-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
        }

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      // Soporte de teclado
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  return { init };
})();
