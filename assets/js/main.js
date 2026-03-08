/**
 * MAIN — Orchestrator
 * Boots all modules in correct order after DOM is ready.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Inject config data into DOM
  if (typeof SITE_CONFIG !== 'undefined' && typeof ConfigInjector !== 'undefined') {
    ConfigInjector.init(SITE_CONFIG);
  }

  // 2. Init scroll reveal (after injection so dynamic elements exist)
  if (typeof ScrollReveal !== 'undefined') ScrollReveal.init();

  // 3. Init navbar
  if (typeof Navbar !== 'undefined') Navbar.init();

  // 4. Init animated counters
  if (typeof Counter !== 'undefined') Counter.init();

  // 5. Init FAQ accordion
  if (typeof FAQ !== 'undefined') FAQ.init();

  // 6. Init carousel (removed as Testimonios section was removed)
  // if (typeof Carousel !== 'undefined') Carousel.init();

  // 7. Init WhatsApp + back-to-top + form
  if (typeof WhatsApp !== 'undefined') WhatsApp.init();

  // 8. Re-run scroll reveal to pick up any injected elements
  if (typeof ScrollReveal !== 'undefined') {
    setTimeout(() => ScrollReveal.refresh(), 100);
  }

});
