/* Chapter 6 — the junior-to-senior ladder, 2021-2026 (task-anim-career).
 *
 * Five rungs light bottom-of-ladder to top (chronological), one per
 * beat: e.tres/Lytx junior, consultant years, GlobalLogic/Coalfire
 * senior, the CQRS+Mediator payment work, and the SDD/AI era. Reduced
 * motion: the whole ladder lit, static.
 */
(function () {
  'use strict';

  var STEP_DELAY = 550;

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch6 = function (stage, reducedMotion) {
    var rungs = stage.querySelectorAll('[data-rung]');
    if (rungs.length === 0) return;

    if (reducedMotion) {
      rungs.forEach(function (rung) { rung.classList.add('is-lit'); });
      return;
    }

    window.planPortScan(new Array(rungs.length), STEP_DELAY).steps.forEach(function (step) {
      setTimeout(function () {
        var rung = rungs[step.index];
        if (rung) rung.classList.add('is-lit');
      }, step.time);
    });
  };
})();
