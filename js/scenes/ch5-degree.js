/* Chapter 5 — university and tecnicatura path (task-anim-university).
 *
 * A vertical path lights up step by step: self-taught instincts ->
 * Ingenieria en Software (programming fundamentals) -> Tecnico
 * Programador Universitario, UTN (FRT) -> the diploma unrolls with a
 * seal stamp, 2021. Reduced motion: the finished path, static.
 */
(function () {
  'use strict';

  var STEP_DELAY = 380;

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch5 = function (stage, reducedMotion) {
    var path = stage.querySelectorAll('[data-deg]');
    if (path.length === 0) return;

    if (reducedMotion) {
      path.forEach(function (el) { el.classList.add('is-lit'); });
      return;
    }

    window.planPortScan(new Array(path.length), STEP_DELAY).steps.forEach(function (step) {
      setTimeout(function () {
        var el = path[step.index];
        if (el) el.classList.add('is-lit');
      }, step.time);
    });
  };
})();
