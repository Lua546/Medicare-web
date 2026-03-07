/**
 * NAVBAR.JS
 * Maneja: sticky scroll, cambio de estilo, menú hamburguesa, enlace activo
 */

const Navbar = (function () {

  const SCROLL_THRESHOLD = 60;

  let navbar, hamburger, mobileMenu, lastScrollY;

  function init() {
    navbar      = document.getElementById('navbar');
    hamburger   = document.getElementById('nav-hamburger');
    mobileMenu  = document.getElementById('navbar-mobile-menu');

    if (!navbar) return;

    lastScrollY = window.scrollY;

    // Aplicar estado inicial
    updateNavbarState();

    // Scroll listener (throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNavbarState();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Hamburger
    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Cerrar menú al hacer clic en un link del móvil
    document.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!navbar.contains(e.target)) closeMobileMenu();
      }
    });

    // Scroll suave para todos los anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', onAnchorClick);
    });

    // Resaltar sección activa en scroll
    setupScrollSpy();
  }

  function updateNavbarState() {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--solid');
    } else {
      navbar.classList.add('navbar--transparent');
      navbar.classList.remove('navbar--solid');
    }

    lastScrollY = scrollY;
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function onAnchorClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const navHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height-small')) || 60;

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
    closeMobileMenu();
  }

  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link[href^="#"], .navbar__mobile-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
    });

    sections.forEach(s => observer.observe(s));
  }

  return { init };
})();
