/**
 * WHATSAPP & BACK-TO-TOP — Floating action buttons
 */

const WhatsApp = (() => {

  function init() {
    initBackToTop();
    initForm();
  }

  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const btn = form.querySelector('.btn-primary');
    if (!btn) return;

    btn.addEventListener('click', e => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'rgba(239,68,68,0.6)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (!valid) return;

      const origHTML = btn.innerHTML;
      btn.textContent = 'Enviando...';
      btn.style.opacity = '0.8';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = `Solicitud enviada &mdash; Nos contactaremos pronto`;
        btn.style.opacity = '1';
        btn.style.background = 'var(--teal-deeper)';
        form.reset();

        setTimeout(() => {
          btn.innerHTML = origHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 5000);
      }, 1400);
    });
  }

  return { init };

})();
