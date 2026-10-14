/* Chapter 7 — five agents, one human (task-chapter-pager).
 *
 * A work item travels the pipeline: each agent lights as it receives it,
 * QA fails the first attempt and the item bounces back to the developer
 * (the "sent back" loop lights up), the second pass goes green through
 * tech lead, and the human gate closes the sequence.
 * Reduced motion: every agent lit, loop visible, static.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  /* [start, agentIndex] keyframes: where the work item is over time. */
  var PATH = [
    [0.06, 0], [0.16, 1], [0.26, 2], [0.36, 3], /* first pass */
    [0.46, 2],                                   /* QA fails -> back to dev */
    [0.58, 3], [0.7, 4]                          /* second pass, review */
  ];

  window.SceneFX.ch7 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var list = stage.querySelector('.pipeline');
    var back = stage.querySelector('.pipeline-back');
    if (!list) return;
    var agents = list.querySelectorAll('li');

    if (reducedMotion || !scrub) {
      list.classList.add('is-static');
      return;
    }
    list.classList.add('is-scripted');

    return function render(p) {
      var at = -1, step = -1;
      for (var i = 0; i < PATH.length; i++) {
        if (p >= PATH[i][0]) { at = PATH[i][1]; step = i; }
      }
      var failed = step >= 4;           /* the bounce has happened */
      var bouncing = step === 4;
      var done = p >= 0.82;
      agents.forEach(function (li, k) {
        li.classList.toggle('is-seen', at >= 0 && (k <= at || (failed && k <= 3)));
        li.classList.toggle('is-current', k === at && !done);
        li.classList.toggle('is-fail', k === 3 && bouncing);
        li.classList.toggle('is-pass', done || (k < at && step >= 5));
      });
      list.style.setProperty('--appear', scrub.easeOutCubic(scrub.band(p, 0, 0.12)).toFixed(3));
      list.classList.toggle('is-done', done);
      if (back) {
        back.classList.toggle('is-lit', failed);
        back.classList.toggle('is-active', bouncing);
      }
    };
  };
})();
