(function () {
  'use strict';

  const navbar = document.querySelector('.js-navbar-scroll');
  if (!navbar) return;

  const updateNavbar = () => {
    const isScrolled = window.scrollY > 0;
    navbar.classList.toggle('navbar-bg-onscroll', isScrolled);
    navbar.classList.toggle('navbar-bg-onscroll--fade', !isScrolled);
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
})();
