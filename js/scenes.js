/* Scene FX registry (task-anim-crt-boot, task-scrub-scenes).
 *
 * Per-chapter animation modules register themselves as
 *   SceneFX[sceneId] = function (stage, reducedMotion) {}
 * in js/scenes/*.js. This listener bridges the engine's scene-enter
 * events (fired once per scene by the reveal orchestration) to those
 * handlers. Reduced motion is passed through so scenes can paint a
 * static final frame; the CSS layer disables the motion itself.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  Array.prototype.forEach.call(document.querySelectorAll('[data-scene]'), function (scene) {
    var id = scene.dataset.scene;
    scene.addEventListener('scene-enter', function (event) {
      var fx = window.SceneFX[id];
      var stage = scene.querySelector('[data-stage="' + id + '"]');
      if (typeof fx !== 'function' || !stage) return;
      var renderer = fx(stage, !!(event.detail && event.detail.reducedMotion));
      /* Scrub-style scenes return a render(progress) function; the scrub
         engine (js/scrub.js) drives it every frame, both directions. */
      if (typeof renderer === 'function') {
        window.SceneRenderers = window.SceneRenderers || {};
        window.SceneRenderers[id] = renderer;
        document.dispatchEvent(new CustomEvent('scene-renderer', {
          detail: { id: id }
        }));
      }
    });
  });
})();
