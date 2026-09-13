/* Chapter 5 — the degree path (task-anim-university, task-scrub-scenes).
 *
 * Scroll-scrubbed: the path draws with scroll — dots light, the
 * connecting segments grow (inline scaleY, so they scrub smoothly both
 * ways), and the diploma lands rotated when the path completes.
 * Reduced motion: full path, diploma shown, static.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch5 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var steps = stage.querySelectorAll('.deg-step');
    var segs = stage.querySelectorAll('.deg-seg');
    var diploma = stage.querySelector('.deg-diploma');
    if (steps.length === 0) return;

    function paintFinal() {
      steps.forEach(function (s) { s.classList.add('is-lit'); });
      segs.forEach(function (s) {
        s.classList.add('is-lit');
        s.style.transform = '';
      });
      if (diploma) diploma.classList.add('is-lit');
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      return;
    }

    return function render(p) {
      /* Step/dot/segment/diploma sequence along the pin. */
      steps.forEach(function (step, i) {
        var at = 0.05 + i * 0.24;
        step.classList.toggle('is-lit', p >= at);
      });

      segs.forEach(function (seg, i) {
        var grow = scrub.band(p, 0.1 + i * 0.24, 0.32 + i * 0.24);
        seg.style.transform = 'scaleY(' + grow.toFixed(3) + ')';
        seg.style.transition = 'none'; /* scrub owns the motion */
      });

      if (diploma) diploma.classList.toggle('is-lit', p > 0.82);
    };
  };
})();
