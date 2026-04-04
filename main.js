/* =============================================
   TILIA PHOTOGRAPHY - main.js
   ============================================= */

$(function () {

  /* ---- Sticky Header ---- */
  const $header = $('#site-header');

  function handleScroll() {
    if ($(window).scrollTop() > 60) {
      $header.addClass('scrolled');
      $('#backToTop').addClass('visible');
    } else {
      $header.removeClass('scrolled');
      $('#backToTop').removeClass('visible');
    }
  }

  $(window).on('scroll', handleScroll);
  handleScroll(); // Run on load

  /* ---- Mobile Nav Toggle ---- */
  $('#mobileNavToggle').on('click', function () {
    $('.main-nav').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Mobile dropdown toggles
  $('.nav-item.has-dropdown > a').on('click', function (e) {
    if ($(window).width() < 992) {
      e.preventDefault();
      $(this).closest('.nav-item').toggleClass('open');
    }
  });

  /* ---- Back to Top ---- */
  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ---- Hero Swiper ---- */
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      prevEl: '.hero-swiper .swiper-button-prev',
      nextEl: '.hero-swiper .swiper-button-next',
    },
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true,
    },
  });

  /* ---- Testimonials Swiper ---- */
  const testiSwiper = new Swiper('.testimonials-swiper', {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.testimonials-swiper .swiper-pagination',
      clickable: true,
    },
  });

  /* ---- Simple Lightbox (Portfolio & Instagram) ---- */
  if (typeof $.fn.simpleLightbox !== 'undefined') {
    $('.gallery-item').simpleLightbox({
      overlay: true,
      spinner: true,
      nav: true,
      nextBtnCaption: '›',
      prevBtnCaption: '‹',
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate(
        { scrollTop: target.offset().top - 130 },
        700,
        'swing'
      );
    }
  });

  /* ---- Portfolio Item Hover Animation ---- */
  // Stagger reveal on scroll (intersection observer)
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(
      '.service-card, .portfolio-item, .team-card, .footer-widget'
    ).forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    });
  }

  /* ---- Prevent Default on # links ---- */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

});
