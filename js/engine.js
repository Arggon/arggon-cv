/* Scroll-observer engine (task-scaffold-shell, orchestrated by task-timeline-reveal).
 *
 * Watches every [data-scene] section and emits per-scene custom events:
 *   - `scene-enter`: scene crossed the reveal threshold (detail.reducedMotion
 *     tells scenes to paint their static frame when the user opted out).
 *   - `scene-exit`: observed scene left the viewport.
 *
 * Reveal orchestration (js/reveal.js) enforces the story contract: every
 * scene animates exactly once, in document order; entering scene N instantly
 * catches up any hidden scene before it, so rail jumps and fast scrolls stay
 * jank-free. `prefers-reduced-motion: reduce` still receives scene-enter so
 * scenes can paint their static final frame; the CSS layer disables motion.
 */
(function () {
  'use strict';

  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'));
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (scenes.length === 0) return;

  var REVEAL_THRESHOLD = 0.35;

  function byId(id) {
    return scenes.filter(function (s) { return s.dataset.scene === id; })[0];
  }

  function reveal(scene, instant) {
    scene.classList.toggle('is-instant', !!instant);
    scene.classList.add('is-revealed');
    scene.dispatchEvent(new CustomEvent('scene-enter', {
      detail: { reducedMotion: reducedMotion.matches }
    }));
  }

  /* Very old engines without IntersectionObserver get everything revealed
     up front instead of a blank page. */
  if (typeof window.IntersectionObserver !== 'function') {
    scenes.forEach(function (scene) {
      reveal(scene, true);
    });
    return;
  }

  var machine = createRevealOrchestrator({
    ids: scenes.map(function (scene) { return scene.dataset.scene; }),
    onAnimate: function (id) {
      reveal(byId(id), false);
      observer.unobserve(byId(id)); // animate once, never re-trigger
    },
    onCatchUp: function (id) {
      reveal(byId(id), true);
      observer.unobserve(byId(id));
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.dataset.scene;
      if (entry.isIntersecting) {
        machine.enter(id);
      } else {
        machine.exit(id);
        entry.target.dispatchEvent(new CustomEvent('scene-exit'));
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  scenes.forEach(function (scene) {
    observer.observe(scene);
  });
})();
