/**
 * CONFIG INJECTOR
 * Reads SITE_CONFIG and populates all dynamic DOM elements.
 * Called once the DOM is ready (from main.js).
 */

const ConfigInjector = (() => {

  /* ── Helpers ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function set(sel, val, prop = 'textContent') {
    const el = $(sel);
    if (el && val !== undefined && val !== null && val !== '') {
      if (prop === 'innerHTML') el.innerHTML = val;
      else if (prop === 'href') el.href = val;
      else if (prop === 'src') el.src = val;
      else el.textContent = val;
    }
  }

  function icon(name) {
    const icons = {
      'stethoscope': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      'heart-pulse': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      'microscope': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,
      'scan': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/></svg>`,
      'baby': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
      'bone': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18.5 5.5a4.5 4.5 0 0 1 0 6.364L12 18.364l-6.5-6.5A4.5 4.5 0 0 1 12 5.5a4.5 4.5 0 0 1 6.5 0z"/></svg>`,
    };
    return icons[name] || icons['stethoscope'];
  }

  function stars(n) {
    return Array.from({ length: n }, () =>
      `<svg class="testi-card__star" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    ).join('');
  }

  function shieldIcon() {
    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  }

  /* ── SEO ── */
  function injectSEO(cfg) {
    document.title = cfg.seo.titulo;
    const desc = $('meta[name="description"]');
    if (desc) desc.content = cfg.seo.descripcion;
    const kw = $('meta[name="keywords"]');
    if (kw) kw.content = cfg.seo.keywords;
  }

  /* ── NAVBAR ── */
  function injectNavbar(cfg) {
    $$('[data-logo]').forEach(el => {
      el.innerHTML = cfg.clinica.nombreCorto + '<span>.</span>';
    });
  }

  /* ── HERO ── */
  function injectHero(cfg) {
    set('[data-hero-title]', null); // set in HTML with markup
    set('[data-hero-desc]', cfg.clinica.descripcionHero);
    set('[data-hero-eyebrow-city]', 'Asunción, Paraguay — Desde ' + (new Date().getFullYear() - cfg.clinica.aniosExperiencia));
  }

  /* ── STATS ── */
  function injectStats(cfg) {
    const map = [
      { sel: '[data-stat="anios"]', val: cfg.clinica.aniosExperiencia, suffix: '' },
      { sel: '[data-stat="pacientes"]', val: cfg.clinica.pacientesAtendidos, suffix: '' },
      { sel: '[data-stat="especialistas"]', val: cfg.clinica.especialistas, suffix: '' },
      { sel: '[data-stat="satisfaccion"]', val: cfg.clinica.satisfaccion, suffix: '%' },
    ];
    map.forEach(({ sel, val, suffix }) => {
      const el = $(sel);
      if (el) {
        el.dataset.count = val;
        el.dataset.suffix = suffix;
        el.textContent = '0' + suffix;
      }
    });
  }

  /* ── SERVICIOS HERO CARDS (first 3) ── */
  function injectHeroCards(cfg) {
    const container = $('#hero-cards');
    if (!container) return;
    container.innerHTML = '';
    cfg.servicios.slice(0, 3).forEach(s => {
      container.innerHTML += `
        <div class="hero-card">
          <div class="hero-card__icon">${icon(s.icono)}</div>
          <div class="hero-card__title">${s.nombre}</div>
          <div class="hero-card__desc">${s.descripcion}</div>
          <a href="#contacto" class="hero-card__link" data-especialidad="${s.nombre}">
            Agendar consulta
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>`;
    });
  }

  /* ── ESPECIALIDADES GRID ── */
  function injectEspecialidades(cfg) {
    const container = $('#especialidades-grid');
    if (!container) return;
    container.innerHTML = '';
    // Use gallery images for specialties (fallback to placeholder colors)
    const bgImages = [
      'https://i.pinimg.com/736x/16/54/36/165436200d222fdfb2167c6aa2031288.jpg',
      'https://i.pinimg.com/1200x/df/51/86/df518651cbd744b3e03e2d71bbd5346c.jpg',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      'https://i.pinimg.com/736x/3d/fa/7f/3dfa7f9829a9057957b268b631175074.jpg',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80',
    ];
    cfg.servicios.forEach((s, i) => {
      container.innerHTML += `
        <div class="esp-card reveal${i > 0 ? ' reveal-delay-' + Math.min(i, 4) : ''}">
          <div class="esp-card__img" style="background-image:url('${bgImages[i] || ''}')"></div>
          <div class="esp-card__overlay"></div>
          <div class="esp-card__content">
            <div class="esp-card__tag">Especialidad</div>
            <div class="esp-card__name">${s.nombre}</div>
            <div class="esp-card__desc">${s.descripcion}</div>
          </div>
        </div>`;
    });
  }

  /* ── NOSOTROS ── */
  function injectNosotros(cfg) {
    set('[data-nosotros-desc]', cfg.clinica.descripcionSobre);
  }

  /* ── GALERÍA ── */
  function injectGaleria(cfg) {
    const container = $('#galeria-grid');
    if (!container) return;
    container.innerHTML = '';
    cfg.galeria.forEach((g, i) => {
      container.innerHTML += `
        <div class="galeria-item reveal${i > 0 ? ' reveal-delay-' + Math.min(i, 4) : ''}">
          <div class="galeria-item__bg" style="background-image:url('${g.imagen}')"></div>
          <div class="galeria-item__overlay"></div>
          <div class="galeria-item__info">
            <div class="galeria-item__title">${g.titulo}</div>
            <div class="galeria-item__desc">${g.descripcion}</div>
          </div>
        </div>`;
    });
  }

  /* ── MÉDICOS ── */
  function injectMedicos(cfg) {
    const container = $('#medicos-grid');
    if (!container) return;
    container.innerHTML = '';
    cfg.medicos.forEach((m, i) => {
      const avatarContent = m.imagen
        ? `<img src="${m.imagen}" alt="${m.nombre}" loading="lazy">`
        : m.iniciales;
      container.innerHTML += `
        <div class="medico-card reveal reveal-delay-${Math.min(i, 4)}">
          <div class="medico-card__years">${m.aniosExperiencia}</div>
          <div class="medico-card__avatar">${avatarContent}</div>
          <div class="medico-card__esp">${m.especialidad}</div>
          <div class="medico-card__nombre">${m.nombre}</div>
          <div class="medico-card__bio">${m.bio}</div>
          <div class="medico-card__certs">
            ${shieldIcon()}
            ${m.certificaciones}
          </div>
        </div>`;
    });
  }

  /* ── TESTIMONIOS ── */
  function injectTestimonios(cfg) {
    // Removed visually
  }

  /* ── FAQ ── */
  function injectFaq(cfg) {
    const container = $('#faq-grid');
    if (!container) return;
    container.innerHTML = '';
    cfg.faq.forEach(f => {
      container.innerHTML += `
        <div class="faq-item">
          <div class="faq-item__q">
            <span>${f.pregunta}</span>
            <svg class="faq-item__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <div class="faq-item__a">${f.respuesta}</div>
        </div>`;
    });
  }

  /* ── CONTACT INFO ── */
  function injectContacto(cfg) {
    set('[data-tel]', cfg.contacto.telefono);
    set('[data-tel]', cfg.contacto.telefono, 'textContent');
    set('[data-tel-href]', 'tel:' + cfg.contacto.telefono.replace(/\s/g, ''), 'href');
    set('[data-email]', cfg.contacto.email);
    set('[data-email-href]', 'mailto:' + cfg.contacto.email, 'href');
    set('[data-direccion]', cfg.contacto.direccion);

    // Horarios
    const horDiv = $('#horarios-list');
    if (horDiv) {
      horDiv.innerHTML = '';
      cfg.horarios.forEach(h => {
        horDiv.innerHTML += `
          <div class="horario-row">
            <span class="horario-row__dia">${h.dia}</span>
            <span class="horario-row__hora">${h.hora}</span>
          </div>`;
      });
    }

    // Especialidades select
    const sel = $('#form-especialidad');
    if (sel) {
      cfg.servicios.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.nombre;
        opt.textContent = s.nombre;
        sel.appendChild(opt);
      });
    }
  }

  /* ── REDES SOCIALES ── */
  function injectRedes(cfg) {
    const r = cfg.redesSociales;
    const socials = [
      { key: 'facebook', sel: '[data-social="facebook"]' },
      { key: 'instagram', sel: '[data-social="instagram"]' },
      { key: 'twitter', sel: '[data-social="twitter"]' },
      { key: 'linkedin', sel: '[data-social="linkedin"]' },
    ];
    socials.forEach(({ key, sel }) => {
      const el = $(sel);
      if (!el) return;
      if (r[key]) el.href = r[key];
      else el.style.display = 'none';
    });
  }

  /* ── WHATSAPP ── */
  function injectWhatsapp(cfg) {
    const msg = encodeURIComponent(cfg.contacto.whatsappMensaje);
    const url = `https://wa.me/${cfg.contacto.whatsapp}?text=${msg}`;
    $$('[data-wa-href]').forEach(el => el.href = url);
  }

  /* ── FOOTER ── */
  function injectFooter(cfg) {
    $$('[data-footer-nombre]').forEach(el => {
      el.innerHTML = cfg.clinica.nombreCorto + '<span>.</span> Clínica';
    });
    $$('[data-footer-eslogan]').forEach(el => {
      el.textContent = cfg.clinica.eslogan;
    });
    const yr = $('[data-footer-year]');
    if (yr) yr.textContent = new Date().getFullYear();
    const nm = $('[data-footer-clinica]');
    if (nm) nm.textContent = cfg.clinica.nombre;
  }

  /* ── INIT ── */
  function init(cfg) {
    injectSEO(cfg);
    injectNavbar(cfg);
    injectHero(cfg);
    injectStats(cfg);
    injectHeroCards(cfg);
    injectEspecialidades(cfg);
    injectNosotros(cfg);
    injectGaleria(cfg);
    injectMedicos(cfg);
    injectTestimonios(cfg);
    injectFaq(cfg);
    injectContacto(cfg);
    injectRedes(cfg);
    injectWhatsapp(cfg);
    injectFooter(cfg);

    // Add click listener for specialty pre-selection from hero cards
    document.addEventListener('click', function (e) {
      const link = e.target.closest('[data-especialidad]');
      if (link) {
        const specialty = link.getAttribute('data-especialidad');
        const select = $('#form-especialidad');
        if (select) {
          select.value = specialty;
        }
      }
    });
  }

  return { init };

})();
