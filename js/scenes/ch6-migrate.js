/* Chapter 6 — strangler migration + the lock (task-chapter-pager).
 *
 * Timeline (progress 0..1, replayed on every arrival):
 *   row 1: the legacy monolith settles, a request pulse travels the wire,
 *          the .NET 9 service ignites and its latency bar drops 30%;
 *   row 2: the access role's lock snaps shut, the pulse runs again and the
 *          AWS Marketplace listing goes live.
 * Transform/opacity/custom-property only. Reduced motion: final frame.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch6 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var flow = stage.querySelector('.lockflow');
    if (!flow) return;
    var rows = flow.querySelectorAll('.lf-row');

    function paint(p) {
      var b = scrub.band;
      var e = scrub.easeOutCubic;
      var r1 = rows[0], r2 = rows[1];
      if (r1) {
        r1.style.setProperty('--in', e(b(p, 0.0, 0.14)).toFixed(3));
        r1.style.setProperty('--wire', e(b(p, 0.12, 0.34)).toFixed(3));
        r1.style.setProperty('--out', e(b(p, 0.3, 0.44)).toFixed(3));
        r1.style.setProperty('--gauge', e(b(p, 0.4, 0.62)).toFixed(3));
        r1.classList.toggle('is-live', p >= 0.34);
        r1.classList.toggle('is-retired', p >= 0.5);
      }
      if (r2) {
        r2.style.setProperty('--in', e(b(p, 0.46, 0.6)).toFixed(3));
        r2.style.setProperty('--lock', e(b(p, 0.56, 0.7)).toFixed(3));
        r2.style.setProperty('--wire', e(b(p, 0.68, 0.86)).toFixed(3));
        r2.style.setProperty('--out', e(b(p, 0.82, 0.96)).toFixed(3));
        r2.classList.toggle('is-locked', p >= 0.66);
        r2.classList.toggle('is-live', p >= 0.86);
      }
    }

    if (reducedMotion || !scrub) {
      flow.classList.add('is-static');
      return;
    }
    flow.classList.add('is-scripted');
    return paint;
  };
})();
