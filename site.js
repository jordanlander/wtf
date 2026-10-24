(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const isProduction = ['www.wileytrucking.com', 'wileytrucking.com'].includes(location.hostname);
  // Preserve the existing Analytics property. Previews send no analytics or inquiries.
  if (isProduction) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    const analytics = document.createElement('script');
    analytics.src = 'https://www.googletagmanager.com/gtag/js?id=G-6Z4YT9H6FV';
    analytics.async = true;
    document.head.appendChild(analytics);
    window.gtag('js', new Date());
    window.gtag('config', 'G-6Z4YT9H6FV');
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const closeMenu = () => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
      }
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const service = document.getElementById('service-type');
  const context = document.getElementById('request-context');
  if (service && context) {
    service.addEventListener('change', () => { context.value = service.value; });
    document.querySelectorAll('[data-service]').forEach(link => {
      link.addEventListener('click', () => {
        service.value = link.dataset.service;
        context.value = link.dataset.service;
      });
    });
  }
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      if (!isProduction) {
        event.preventDefault();
        const status = document.getElementById('form-status');
        status.hidden = false;
        status.textContent = 'Preview only: your entries passed validation. No request has been sent.';
        status.focus();
      }
      // On production, the browser posts directly to the original FormSubmit destination.
    });
  }
  const mobileActions = document.querySelector('.mobile-actions');
  const contact = document.getElementById('contact');
  if (mobileActions && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      mobileActions.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0 }).observe(contact);
  }
})();
