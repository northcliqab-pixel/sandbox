/* Shared progressive enhancements: navigation, theme, reveals and contact feedback. */
(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const savedTheme = localStorage.getItem('northcliq-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  root.dataset.theme = savedTheme || (preferredDark ? 'dark' : 'light');

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('northcliq-theme', root.dataset.theme);
    updateThemeLabel();
  });

  const closeMenu = () => {
    navLinks?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks?.classList.toggle('is-open', !open);
    document.body.classList.toggle('nav-open', !open);
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 1080) closeMenu(); });

  // Carry CTA intent into the enquiry form without requiring a backend router.
  const params = new URLSearchParams(window.location.search);
  const intentField = document.querySelector('#interest');
  const productField = document.querySelector('#product');
  if (intentField && params.has('intent')) intentField.value = params.get('intent');
  if (productField && params.has('product')) productField.value = params.get('product');

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = `North Cliq ${data.get('interest')} enquiry — ${data.get('company')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Business email: ${data.get('email')}`,
      `Country: ${data.get('country')}`,
      `Enquiry: ${data.get('interest')}`,
      `Product: ${data.get('product') || 'Not specified'}`,
      `Estimated quantity: ${data.get('quantity') || 'Not specified'}`,
      '',
      String(data.get('message'))
    ].join('\n');
    if (status) status.textContent = 'Your enquiry is ready. Opening your email application…';
    window.location.href = `mailto:sourcing@northcliq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.querySelectorAll('[data-year]').forEach((item) => { item.textContent = new Date().getFullYear(); });
})();
