/* Chapter 6 — the junior-to-senior ladder (task-anim-career, task-scrub-scenes).
 *
 * Scroll-scrubbed: rungs light one by one with scroll, forward and
 * backward. Reduced motion: all rungs lit, static.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch6 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var rungs = stage.querySelectorAll('.rung');
    if (rungs.length === 0) return;

    function paintFinal() {
      rungs.forEach(function (r) { r.classList.add('is-lit'); });
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      return;
    }

    return function render(p) {
      rungs.forEach(function (rung, i) {
        var lit = scrub.band(p, 0.08, 0.85) * rungs.length;
        rung.classList.toggle('is-lit', i + 1 <= lit);
      });
    };
  };
})();
