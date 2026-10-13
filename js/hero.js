/* Hero impact counters: count up once when visible. Final values ship in
 * the HTML, so no-JS and reduced-motion users see the real numbers. */
(function () {
  'use strict';
  var nums = document.querySelectorAll('.metric-num[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function run(el) {
    var target = +el.getAttribute('data-count'), start = null, dur = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + (el.getAttribute('data-suffix') || '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.6 });
  Array.prototype.forEach.call(nums, function (n) { io.observe(n); });
}());
