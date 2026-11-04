/* Small, dependency-free navigation for the static portfolio. */
(() => {
  'use strict';
  const toggle = document.querySelector('.mobile-nav-toggle');
  const icon = toggle.querySelector('i');
  const closeMenu = () => {
    document.body.classList.remove('mobile-nav-active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    icon.classList.replace('bx-x', 'bx-menu');
  };
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('mobile-nav-active');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    icon.classList.toggle('bx-menu', !open);
    icon.classList.toggle('bx-x', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  const links = [...document.querySelectorAll('#navbar .scrollto')];
  links.forEach(link => link.addEventListener('click', closeMenu));
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  const backToTop = document.querySelector('.back-to-top');
  let scheduled = false;
  const updateNavigation = () => {
    const position = window.scrollY + 200;
    links.forEach((link, index) => {
      const section = sections[index];
      const active = section && position >= section.offsetTop &&
        position < section.offsetTop + section.offsetHeight;
      link.classList.toggle('active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    backToTop.classList.toggle('active', window.scrollY > 100);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();