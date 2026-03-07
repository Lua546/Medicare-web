/**
 * CONFIG INJECTOR
 * Lee SITE_CONFIG y construye dinámicamente el contenido del DOM.
 * Este archivo NO debe ser editado por el cliente.
 */

const ConfigInjector = (function () {

  // ── Helpers ──────────────────────────────────────────────────

  /** Inserta HTML en todos los elementos que coincidan con el selector */
  function setText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
      if (el) el.textContent = text;
    });
  }

  function setHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function setAttr(selector, attr, value) {
    document.querySelectorAll(selector).forEach(el => {
      if (el) el.setAttribute(attr, value);
    });
  }

  // ── SVG Icons library ────────────────────────────────────────

  const ICONS = {
    stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
    "heart-pulse": `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h5.27"/></svg>`,
    microscope: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
    scan: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="7" y1="12" y2="12.01"/><line x1="12" x2="12" y1="12" y2="12.01"/><line x1="17" x2="17" y1="12" y2="12.01"/></svg>`,
    baby: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>`,
    bone: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>`,
    // Extras
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.79 19.79 0 0 1 1.61 2.84 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    mappin: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg viewBox="0 0 24 24" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    chevrondown: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`,
    arrowleft: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>`,
    arrowright: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>`,
    arrowup: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/></svg>`,
    cross: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>`,
    building: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M9 6h.01M12 6h.01M15 6h.01M9 10h.01M12 10h.01M15 10h.01"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    award: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  };

  function getIcon(name, cls = '') {
    const svg = ICONS[name] || ICONS['cross'];
    return `<span class="icon ${cls}">${svg}</span>`;
  }

  // ── SEO ──────────────────────────────────────────────────────

  function injectSEO() {
    const s = SITE_CONFIG.seo;
    const c = SITE_CONFIG.clinica;
    document.title = s.titulo;
    setAttr('meta[name="description"]', 'content', s.descripcion);
    setAttr('meta[name="keywords"]',    'content', s.keywords);
    setAttr('meta[property="og:title"]','content', s.titulo);
    setAttr('meta[property="og:description"]','content', s.descripcion);
  }

  // ── Navbar ───────────────────────────────────────────────────

  function injectNavbar() {
    const c  = SITE_CONFIG.clinica;
    const ct = SITE_CONFIG.contacto;
    setText('#navbar-logo-text',    c.nombreCorto);
    setText('#navbar-logo-tagline', c.eslogan);
    setText('#navbar-tel', ct.telefono);
    setAttr('#navbar-phone', 'href', `tel:${ct.telefono.replace(/\s/g,'')}`);
  }

  // ── Hero ─────────────────────────────────────────────────────

  function injectHero() {
    const c = SITE_CONFIG.clinica;
    const ct = SITE_CONFIG.contacto;

    setText('#hero-title',       c.nombre);
    setText('#hero-desc',        c.descripcionHero);

    // Botón de WhatsApp hero
    const waBtn = document.getElementById('hero-whatsapp-btn');
    if (waBtn) {
      waBtn.href = `https://wa.me/${ct.whatsapp}?text=${encodeURIComponent(ct.whatsappMensaje)}`;
    }

    // Servicios en hero card
    const heroList = document.getElementById('hero-services-list');
    if (heroList) {
      const primeros = SITE_CONFIG.servicios.slice(0, 4);
      heroList.innerHTML = primeros.map(s => `
        <div class="hero__service-item">
          <div class="hero__service-icon">${ICONS[s.icono] || ICONS.cross}</div>
          <div>
            <div class="hero__service-name">${s.nombre}</div>
          </div>
        </div>
      `).join('');
    }

    // Social proof
    setText('#hero-pacientes-count', '+' + c.pacientesAtendidos.toLocaleString('es-PY'));
  }

  // ── Quick bar ────────────────────────────────────────────────

  function injectQuickBar() {
    const c = SITE_CONFIG.contacto;
    const h = SITE_CONFIG.horarios;
    setText('#qb-telefono', c.telefono);
    setText('#qb-email', c.email);
    if (h.length > 0) setText('#qb-horario', h[0].hora);
    if (h.length > 1) setText('#qb-horario-sat', h[1].hora);
  }

  // ── Sobre ────────────────────────────────────────────────────

  function injectAbout() {
    const c = SITE_CONFIG.clinica;
    setText('#about-nombre', c.nombre);
    setText('#about-desc', c.descripcionSobre);
    setText('#about-anios', c.aniosExperiencia);
  }

  // ── Stats (counters) ─────────────────────────────────────────

  function injectStats() {
    const c = SITE_CONFIG.clinica;
    const target = document.getElementById('stats-section');
    if (!target) return;
    target.innerHTML = `
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item reveal delay-1">
            <span class="stat-item__number" data-target="${c.pacientesAtendidos}" data-suffix="+">0</span>
            <span class="stat-item__label">Pacientes Atendidos</span>
          </div>
          <div class="stat-item reveal delay-2">
            <span class="stat-item__number" data-target="${c.aniosExperiencia}" data-suffix="+">0</span>
            <span class="stat-item__label">Años de Experiencia</span>
          </div>
          <div class="stat-item reveal delay-3">
            <span class="stat-item__number" data-target="${c.especialistas}" data-suffix="">0</span>
            <span class="stat-item__label">Especialistas</span>
          </div>
          <div class="stat-item reveal delay-4">
            <span class="stat-item__number" data-target="${c.satisfaccion}" data-suffix="%">0</span>
            <span class="stat-item__label">Satisfacción</span>
          </div>
        </div>
      </div>
    `;
  }

  // ── Servicios ────────────────────────────────────────────────

  function injectServicios() {
    const container = document.getElementById('services-grid');
    if (!container) return;
    container.innerHTML = SITE_CONFIG.servicios.map((s, i) => `
      <div class="card service-card reveal delay-${(i % 3) + 1}">
        <div class="service-card__icon">${ICONS[s.icono] || ICONS.cross}</div>
        <h3 class="service-card__title">${s.nombre}</h3>
        <p class="service-card__desc">${s.descripcion}</p>
      </div>
    `).join('');
  }

  // ── Galería ──────────────────────────────────────────────────

  function injectGaleria() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    container.innerHTML = SITE_CONFIG.galeria.map((item, i) => `
      <div class="gallery-card reveal delay-${(i % 3) + 1}">
        <div class="gallery-placeholder">
          ${ICONS.image}
          <span>${item.titulo}</span>
        </div>
        <div class="gallery-card__overlay">
          <div>
            <div class="gallery-card__title">${item.titulo}</div>
            <div class="gallery-card__desc">${item.descripcion}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ── Médicos ──────────────────────────────────────────────────

  function injectMedicos() {
    const container = document.getElementById('doctors-track');
    if (!container) return;
    container.innerHTML = SITE_CONFIG.medicos.map((m, i) => `
      <div class="carousel__slide carousel__slide--doctor" style="width: calc(25% - 12px); min-width: 220px;">
        <div class="card doctor-card reveal delay-${(i % 4) + 1}">
          <div class="doctor-card__avatar">
            ${m.imagen
              ? `<img src="${m.imagen}" alt="${m.nombre}" loading="lazy">`
              : `<span class="doctor-card__initials">${m.iniciales}</span>`
            }
          </div>
          <div class="doctor-card__name">${m.nombre}</div>
          <div class="doctor-card__specialty">${m.especialidad}</div>
          <p class="doctor-card__bio">${m.bio}</p>
        </div>
      </div>
    `).join('');
  }

  // ── Testimonios ──────────────────────────────────────────────

  function injectTestimonios() {
    const container = document.getElementById('testimonios-track');
    if (!container) return;
    container.innerHTML = SITE_CONFIG.testimonios.map((t, i) => {
      const initials = t.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const stars = Array.from({ length: t.calificacion }, () =>
        `<svg class="testimonial-card__star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
      ).join('');
      return `
        <div class="carousel__slide" style="width: calc(33.33% - 12px); min-width: 280px;">
          <div class="testimonial-card reveal delay-${(i % 3) + 1}">
            <div class="testimonial-card__quote">"</div>
            <div class="testimonial-card__stars">${stars}</div>
            <p class="testimonial-card__text">${t.texto}</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">${initials}</div>
              <div>
                <div class="testimonial-card__name">${t.nombre}</div>
                <div class="testimonial-card__role">${t.cargo}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ── FAQ ──────────────────────────────────────────────────────

  function injectFAQ() {
    const container = document.getElementById('faq-list');
    if (!container) return;
    container.innerHTML = SITE_CONFIG.faq.map((item, i) => `
      <div class="faq-item reveal delay-${(i % 3) + 1}" data-faq="${i}">
        <button class="faq-trigger" aria-expanded="false" aria-controls="faq-content-${i}">
          <span class="faq-trigger__text">${item.pregunta}</span>
          <span class="faq-trigger__icon">${ICONS.chevrondown}</span>
        </button>
        <div class="faq-content" id="faq-content-${i}" role="region">
          <p>${item.respuesta}</p>
        </div>
      </div>
    `).join('');
  }

  // ── Contacto ─────────────────────────────────────────────────

  function injectContacto() {
    const c = SITE_CONFIG.contacto;
    const h = SITE_CONFIG.horarios;

    setText('#contact-direccion', c.direccion);
    setText('#contact-telefono',  c.telefono);
    setText('#contact-email',     c.email);

    // Horarios
    const horariosEl = document.getElementById('contact-horarios');
    if (horariosEl) {
      horariosEl.innerHTML = h.map(hr => `
        <div class="horario-item">
          <span class="horario-item__dia">${hr.dia}</span>
          <span class="horario-item__hora">${hr.hora}</span>
        </div>
      `).join('');
    }

    // Mapa
    const m = SITE_CONFIG.mapa;
    const mapEl = document.getElementById('map-container');
    if (mapEl) {
      if (m.embedUrl) {
        mapEl.innerHTML = `<iframe src="${m.embedUrl}" allowfullscreen="" loading="lazy" title="Ubicación ${SITE_CONFIG.clinica.nombre}"></iframe>`;
      } else {
        mapEl.innerHTML = `
          ${ICONS.mappin}
          <span>${c.direccion}</span>
        `;
      }
    }

    // WhatsApp botón contacto
    const waBtn = document.getElementById('contact-whatsapp-btn');
    if (waBtn) {
      waBtn.href = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMensaje)}`;
    }
  }

  // ── WhatsApp flotante ────────────────────────────────────────

  function injectWhatsApp() {
    const c = SITE_CONFIG.contacto;
    const btn = document.getElementById('whatsapp-float-btn');
    if (btn) {
      btn.href = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMensaje)}`;
    }
  }

  // ── Footer ───────────────────────────────────────────────────

  function injectFooter() {
    const c = SITE_CONFIG.clinica;
    const ct = SITE_CONFIG.contacto;
    const rs = SITE_CONFIG.redesSociales;

    setText('#footer-nombre', c.nombreCorto);
    setText('#footer-desc',   `${c.descripcionHero.substring(0, 100)}…`);
    setText('#footer-telefono', ct.telefono);
    setText('#footer-email',    ct.email);
    setText('#footer-direccion', ct.direccion);
    setText('#footer-year',     new Date().getFullYear());
    setText('#footer-marca',    c.nombre);

    // Redes sociales
    const socialsEl = document.getElementById('footer-socials');
    if (socialsEl) {
      const redes = [
        { key: 'facebook', svg: `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>` },
        { key: 'instagram', svg: `<svg viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>` },
        { key: 'linkedin', svg: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>` },
      ];
      socialsEl.innerHTML = redes
        .filter(r => rs[r.key])
        .map(r => `
          <a href="${rs[r.key]}" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="${r.key}">
            ${r.svg}
          </a>
        `).join('');
    }
  }

  // ── Init ─────────────────────────────────────────────────────

  function init() {
    injectSEO();
    injectNavbar();
    injectHero();
    injectQuickBar();
    injectAbout();
    injectStats();
    injectServicios();
    injectGaleria();
    injectMedicos();
    injectTestimonios();
    injectFAQ();
    injectContacto();
    injectWhatsApp();
    injectFooter();
  }

  return { init, getIcon, ICONS };
})();
