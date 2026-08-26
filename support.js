/* ==========================================================================
   Beyond the Vault — support.js
   Progressive enhancement only. The page is fully readable without this file.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  /* --- Mobile navigation ------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) { return; }

    var desktop = window.matchMedia('(min-width: 900px)');

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('is-open', !open);
      toggle.setAttribute('aria-expanded', String(!open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { close(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
    });

    document.addEventListener('click', function (e) {
      if (desktop.matches) { return; }
      if (!nav.contains(e.target) && !toggle.contains(e.target)) { close(); }
    });

    // Reset state when crossing the desktop breakpoint.
    var onChange = function () { if (desktop.matches) { close(); } };
    if (desktop.addEventListener) { desktop.addEventListener('change', onChange); }
    else if (desktop.addListener) { desktop.addListener(onChange); }
  }

  /* --- FAQ accordion ---------------------------------------------------- */
  function initFaq() {
    var buttons = document.querySelectorAll('.faq__q');
    Array.prototype.forEach.call(buttons, function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) { return; }

      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
      });
    });

    // Open the panel a deep link points at.
    if (window.location.hash) {
      var target = document.querySelector(window.location.hash + ' .faq__q');
      if (target) { target.click(); }
    }
  }

  /* --- Hero background (set from data-bg so the CSS file stays portable) - */
  function initHeroBg() {
    var el = document.querySelector('[data-bg]');
    if (!el) { return; }
    var src = el.getAttribute('data-bg');
    var probe = new Image();
    probe.onload = function () { el.style.backgroundImage = 'url("' + src + '")'; };
    probe.src = src;
  }

  /* --- Missing-asset placeholders --------------------------------------- */
  /* Until the real files land in /assets, show a branded panel instead of a
     broken-image icon. Harmless once the assets exist. */
  function initImageFallbacks() {
    function fallback(img) {
      if (img.dataset.fallbackApplied) { return; }
      img.dataset.fallbackApplied = 'true';

      var box = document.createElement('div');
      box.className = 'img-missing ' + img.className;
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', img.alt || 'Product image');
      box.textContent = 'Image pending';

      // Keep the slot the same shape the real asset will be.
      var inline = img.getAttribute('style');
      if (inline) { box.style.cssText = inline; }

      var w = parseFloat(img.getAttribute('width'));
      var h = parseFloat(img.getAttribute('height'));
      if (w > 0 && h > 0) { box.style.setProperty('--ph-ratio', w + ' / ' + h); }

      if (img.parentNode) { img.parentNode.replaceChild(box, img); }
    }

    // document.images is live, and fallback() removes nodes from it. Snapshot
    // first, or replacing one image skips the next one in the loop.
    var imgs = Array.prototype.slice.call(document.images);
    imgs.forEach(function (img) {
      img.addEventListener('error', function () { fallback(img); });
      if (img.complete && img.naturalWidth === 0) { fallback(img); }
    });
  }

  /* --- Sticky mobile CTA ------------------------------------------------ */
  function initStickyCta() {
    var cta = document.querySelector('[data-sticky-cta]');
    var offer = document.getElementById('get-it');
    var hero = document.querySelector('.hero');
    if (!cta || !hero) { return; }

    cta.hidden = false;

    function update() {
      var pastHero = hero.getBoundingClientRect().bottom < 0;
      var inOffer = false;
      if (offer) {
        var r = offer.getBoundingClientRect();
        inOffer = r.top < window.innerHeight && r.bottom > 0;
      }
      cta.classList.toggle('is-visible', pastHero && !inOffer);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* --- Reveal on scroll ------------------------------------------------- */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) { return; }

    var targets = document.querySelectorAll(
      '.section .card, .section .split__copy, .section .split__media, .steps li, .price-card'
    );
    if (!targets.length) { return; }

    Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* --- Footer year ------------------------------------------------------ */
  function initYear() {
    var el = document.querySelector('[data-year]');
    if (el) { el.textContent = String(new Date().getFullYear()); }
  }

  /* --- Checkout links ---------------------------------------------------- */
  /* Set CHECKOUT_URL once and every buy button points at it. */
  var CHECKOUT_URL = ''; // TODO: paste the live checkout URL here.

  function initCheckout() {
    if (!CHECKOUT_URL) { return; }
    Array.prototype.forEach.call(document.querySelectorAll('[data-checkout]'), function (a) {
      a.href = CHECKOUT_URL;
      a.rel = 'noopener';
    });
  }

  ready(function () {
    initNav();
    initFaq();
    initHeroBg();
    initImageFallbacks();
    initStickyCta();
    initReveal();
    initYear();
    initCheckout();
  });
})();
