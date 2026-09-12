/* Scroll-observer engine (task-scaffold-shell).
 *
 * Watches every [data-scene] section and emits per-scene custom events:
 *   - `scene-enter`: scene crossed the reveal threshold (dispatched once,
 *     then the scene is unobserved — scenes animate once).
 *   - `scene-exit`: observed scene left the viewport (pre-reveal only).
 *
 * `prefers-reduced-motion: reduce` still receives scene-enter so JS scenes
 * can paint their static final frame; the CSS layer disables transitions.
 */
(function () {
  'use strict';

  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'));
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var REVEAL_THRESHOLD = 0.35;

  function reveal(scene) {
    scene.classList.add('is-revealed');
    scene.dispatchEvent(new CustomEvent('scene-enter', { detail: { reducedMotion: reducedMotion.matches } }));
  }

  /* Very old engines without IntersectionObserver get everything revealed
     up front instead of a blank page. */
  if (typeof window.IntersectionObserver !== 'function') {
    scenes.forEach(reveal);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target); // animate once, never re-trigger
      } else {
        entry.target.dispatchEvent(new CustomEvent('scene-exit'));
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  scenes.forEach(function (scene) {
    observer.observe(scene);
  });
})();
