/* Scroll polish: progress bar, chapter focus, contact reveal, card tilt.
 * One passive scroll listener + one rAF per frame; writes only transforms
 * and CSS custom properties consumed by transform/opacity. Reduced motion
 * disables the motion layer live (the progress bar still updates). */
(function () {
  'use strict';
  var doc = document.documentElement;
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function sync() { doc.classList.toggle('polish', !mq.matches); }
  sync();
  if (mq.addEventListener) mq.addEventListener('change', sync);

  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'));
  var ticking = false;
  function frame() {
    ticking = false;
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    if (mq.matches) return;
    var vh = window.innerHeight, mid = vh / 2;
    scenes.forEach(function (s) {
      var inner = s.querySelector('.scene-inner');
      if (!inner) return;
      var r = inner.getBoundingClientRect();
      var c = r.top + r.height / 2;
      var f = 1 - Math.min(Math.abs(c - mid) / (vh * 0.75), 1);
      f = Math.min(1, f * 1.6);
      s.style.setProperty('--focus', f.toFixed(3));
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();

  var contact = document.querySelector('.contact');
  if (contact && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { contact.classList.add('is-in'); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(contact);
  } else if (contact) { contact.classList.add('is-in'); }

  // Pointer tilt on cards (fine pointers only; touch gets the CSS hover/active).
  if (window.matchMedia('(pointer: fine)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.now-card, .metric'), function (el) {
      el.addEventListener('pointermove', function (e) {
        if (mq.matches) return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        el.style.removeProperty('--rx'); el.style.removeProperty('--ry');
      });
    });
  }
}());
