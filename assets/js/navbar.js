/**
 * NAVBAR — Sticky scroll, active links, hamburger, scroll spy
 */

const Navbar = (() => {

  let navbar, hamburger, mobileMenu, links, pageNums;
  let ticking = false;

  function init() {
    navbar      = document.getElementById('navbar');
    hamburger   = document.getElementById('nav-hamburger');
    mobileMenu  = document.getElementById('nav-mobile');
    links       = [...document.querySelectorAll('.navbar__links a, .navbar__mobile a')];
    pageNums    = [...document.querySelectorAll('.page-nums__item')];

    if (!navbar) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial call

    if (hamburger) {
      hamburger.addEventListener('click', toggleMobile);
    }

    // Close mobile menu on link click
    document.querySelectorAll('.navbar__mobile a').forEach(a => {
      a.addEventListener('click', () => {
        closeMobile();
      });
    });

    // Page number clicks
    pageNums.forEach(item => {
      item.addEventListener('click', () => {
        const target = document.querySelector(item.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Close mobile on outside click
    document.addEventListener('click', e => {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
          closeMobile();
        }
      }
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateSticky();
      updateActiveLink();
      updatePageNums();
      ticking = false;
    });
  }

  function updateSticky() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  function updateActiveLink() {
    const sections = [...document.querySelectorAll('section[id]')];
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  function updatePageNums() {
    const sectionIds = ['inicio', 'servicios', 'nosotros', 'medicos', 'testimonios'];
    let currentIdx = 0;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) currentIdx = i;
    });
    pageNums.forEach((item, i) => {
      item.classList.toggle('active', i === currentIdx);
    });
  }

  function toggleMobile() {
    const open = mobileMenu && mobileMenu.classList.toggle('open');
    if (hamburger) hamburger.classList.toggle('open', open);
  }

  function closeMobile() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
  }

  return { init };

})();
