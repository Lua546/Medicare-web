/**
 * MAIN.JS
 * Punto de entrada principal. Orquesta todos los módulos.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Inyectar contenido desde config
  ConfigInjector.init();

  // 2. Navbar inteligente
  Navbar.init();

  // 3. Carruseles
  //    Doctors: 4 visibles en desktop
  Carousel.init('doctors-carousel', {
    slidesVisible: 4,
    autoplay: false,
    loop: true,
    gap: 16,
  });

  //    Testimonios: 3 visibles en desktop
  Carousel.init('testimonios-carousel', {
    slidesVisible: 3,
    autoplay: true,
    autoplayDelay: 5000,
    loop: true,
    gap: 16,
  });

  // 4. Scroll reveal (debe ir DESPUÉS de inyectar contenido)
  ScrollReveal.init();

  // 5. Contadores animados
  Counter.init();

  // 6. FAQ accordion
  FAQ.init(true); // true = solo uno abierto a la vez

  // 7. WhatsApp flotante y back-to-top
  WhatsApp.init();

  // 8. Formulario de contacto
  initContactForm();

  // 9. Animación de carga inicial
  initPageLoad();

});

// ── Formulario de contacto ──────────────────────────────────────

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn     = form.querySelector('[type="submit"]');
    const success = form.querySelector('.form-success');

    // Simulación de envío
    btn.disabled  = true;
    btn.textContent = 'Enviando…';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar Mensaje';

      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }

      form.reset();
    }, 1500);
  });
}

// ── Animación de entrada de página ──────────────────────────────

function initPageLoad() {
  // Pequeño delay para que el CSS esté completamente pintado
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
}
