/* Scroll polish: progress bar + contact reveal (task-motion-premium).
 * One passive scroll listener + one rAF per frame that writes a single
 * transform (no layout reads besides scroll metrics). The old chapter-focus
 * dimming and 3D card tilt are gone: content is never dimmed while read. */
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

  var ticking = false;
  function frame() {
    ticking = false;
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
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

  // Pointer tilt on cards (restored, task-chapter-pager). Fine pointers only.
  if (window.matchMedia('(pointer: fine)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.now-card, .metric'), function (el) {
      el.addEventListener('pointermove', function (e) {
        if (mq.matches) return;
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (x * 5).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        el.style.removeProperty('--rx'); el.style.removeProperty('--ry');
      });
    });
  }

}());
