/* Scroll-progress engine (task-scrub-engine) — everylastdrop-style scrub.
 *
 * Pure helpers first (UMD, Node-testable):
 *   - sceneProgress: 0..1 progress of a scene's sticky pin range.
 *   - band: a clamped sub-range of progress, for staggering reveals.
 *
 * The DOM wiring keeps one rAF-throttled scroll loop that recomputes every
 * scene's progress (both scroll directions) and hands it to the scene's
 * registered renderer (js/scenes.js stores them in window.SceneRenderers
 * after the reveal engine initializes a scene). Progress-driven scenes read
 * state as a pure function of progress, so scrubbing backwards un-plays them.
 *
 * Reduced motion never binds the loop; scenes paint their final frame once.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.scrubApi = api;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Progress through a scene's pin range.
   * 0 while the scene approaches, 0..1 while its sticky inner is pinned,
   * 1 once the scene has scrolled past.
   * @param {number} sceneTop    Scene's document-space top offset (px).
   * @param {number} sceneHeight Scene total height (px).
   * @param {number} viewHeight  Viewport height (px).
   * @param {number} scrollY     Current scroll offset (px).
   * @returns {number} 0..1
   */
  function sceneProgress(sceneTop, sceneHeight, viewHeight, scrollY) {
    var range = sceneHeight - viewHeight;
    if (!isFinite(range) || range <= 0) return scrollY >= sceneTop ? 1 : 0;
    var p = (scrollY - sceneTop) / range;
    if (!isFinite(p) || p < 0) return 0;
    return p > 1 ? 1 : p;
  }

  /**
   * Clamped sub-range of progress: 0 before the band, 0..1 inside, 1 after.
   * @param {number} p     Global progress 0..1.
   * @param {number} start Band start (0..1, exclusive of ordering checks).
   * @param {number} end   Band end.
   * @returns {number} 0..1
   */
  function band(p, start, end) {
    if (!isFinite(p)) return 0;
    if (!isFinite(start) || !isFinite(end) || end <= start) return p >= end ? 1 : 0;
    var t = (p - start) / (end - start);
    if (t < 0) return 0;
    return t > 1 ? 1 : t;
  }

  /**
   * Smooth 0..1 ease for scrubbed entrances (matches rail/motion feel).
   * @param {number} t 0..1
   * @returns {number}
   */
  function easeOutCubic(t) {
    if (!isFinite(t) || t <= 0) return 0;
    if (t >= 1) return 1;
    return 1 - Math.pow(1 - t, 3);
  }

  /* DOM wiring ------------------------------------------------------------- */

  function initScrub(doc, win) {
    var reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    var scenes = Array.prototype.slice.call(doc.querySelectorAll('[data-scene]'));
    if (scenes.length === 0) return;

    var metrics = []; // { el, top, height, last }
    var raf = null;

    function measure() {
      var scrollY = win.scrollY || win.pageYOffset || 0;
      metrics = scenes.map(function (scene) {
        var box = scene.getBoundingClientRect();
        return {
          el: scene,
          top: box.top + scrollY,
          height: box.height,
          last: -1
        };
      });
    }

    function paint() {
      raf = null;
      var scrollY = win.scrollY || win.pageYOffset || 0;
      var viewHeight = win.innerHeight;
      for (var i = 0; i < metrics.length; i++) {
        var m = metrics[i];
        var render = (window.SceneRenderers || {})[m.el.dataset.scene];
        if (typeof render !== 'function') continue;
        var p = sceneProgress(m.top, m.height, viewHeight, scrollY);
        if (Math.abs(p - m.last) < 0.0005) continue;
        m.last = p;
        render(p);
      }
    }

    function requestPaint() {
      if (raf === null && !reduced.matches) {
        raf = win.requestAnimationFrame(paint);
      }
    }

    measure();
    win.addEventListener('scroll', requestPaint, { passive: true });
    win.addEventListener('resize', function () { measure(); requestPaint(); });

    /* Renderers register as scenes reveal; paint them immediately with the
       current progress so rail jumps land on the right frame. */
    document.addEventListener('scene-renderer', function (event) {
      measure();
      var id = event.detail && event.detail.id;
      var render = (window.SceneRenderers || {})[id];
      if (typeof render === 'function') {
        var m = metrics.filter(function (x) { return x.el.dataset.scene === id; })[0];
        if (m) {
          m.last = -1; /* force */
          render(sceneProgress(m.top, m.height, win.innerHeight,
            win.scrollY || win.pageYOffset || 0));
          m.last = sceneProgress(m.top, m.height, win.innerHeight,
            win.scrollY || win.pageYOffset || 0);
        }
      }
    });
  }

  if (typeof document !== 'undefined' && document.querySelector) {
    initScrub(document, window);
  }

  return {
    sceneProgress: sceneProgress,
    band: band,
    easeOutCubic: easeOutCubic
  };
}));
