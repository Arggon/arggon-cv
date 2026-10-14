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
 * Since task-chapter-pager the renderers are replayed in time when the
 * pager lands on a chapter (see initScrub). Reduced motion paints final frames.
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
   * Progress of a normal-flow (unpinned) section travelling through the
   * viewport: 0 when its top is at 90% of the viewport height, 1 when its
   * top reaches 30%. Scroll never pauses; the scene just plays as it rises.
   * @param {number} sceneTop   Document-space top (px).
   * @param {number} viewHeight Viewport height (px).
   * @param {number} scrollY    Scroll offset (px).
   * @returns {number} 0..1
   */
  function viewProgress(sceneTop, viewHeight, scrollY) {
    if (!isFinite(viewHeight) || viewHeight <= 0) return 1;
    var p = (scrollY + viewHeight * 0.9 - sceneTop) / (viewHeight * 0.6);
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

  /**
   * Per-chapter timeline length (ms). The scene renderers are pure
   * functions of progress, so the chapter pager replays them in TIME on
   * arrival instead of scrubbing them with scroll (task-chapter-pager).
   */
  var TIMELINE_MS = { ch1: 2600, ch2: 2600, ch3: 2400, ch4: 1900, ch5: 1600, ch6: 2200, ch7: 2600 };

  /* DOM wiring ------------------------------------------------------------- */

  function initScrub(doc, win) {
    var reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    var playing = {}; // id -> raf
    var current = null;

    function renderer(id) { return (win.SceneRenderers || {})[id]; }

    function stop(id) {
      if (playing[id]) { win.cancelAnimationFrame(playing[id]); delete playing[id]; }
    }

    function play(id) {
      var render = renderer(id);
      if (typeof render !== 'function') return;
      stop(id);
      if (reduced.matches) { render(1); return; }
      var dur = TIMELINE_MS[id] || 1800;
      var start = null;
      render(0);
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        render(p);
        if (p < 1) playing[id] = win.requestAnimationFrame(step);
        else delete playing[id];
      }
      playing[id] = win.requestAnimationFrame(step);
    }

    /* Arriving at a chapter replays its full timeline; the chapter we left
       keeps its last frame until it is out of view, then rewinds so the
       next visit plays from the top again. */
    doc.addEventListener('chapter-arrive', function (event) {
      var id = event.target && event.target.dataset && event.target.dataset.scene;
      var prev = current;
      current = id || null;
      if (prev && prev !== current) {
        stop(prev);
        var r = renderer(prev);
        if (typeof r === 'function') {
          win.setTimeout(function () { if (current !== prev) r(0); }, 950);
        }
      }
      if (id) play(id);
    });

    /* A renderer can register after the pager already activated its
       chapter (first visit): start it right away. Without the pager
       (reduced motion, or JS paging off) scenes show their final frame. */
    doc.addEventListener('scene-renderer', function (event) {
      var id = event.detail && event.detail.id;
      var render = renderer(id);
      if (typeof render !== 'function') return;
      if (!doc.documentElement.classList.contains('paged')) { render(1); return; }
      if (id === current) play(id); else render(0);
    });
  }

  if (typeof document !== 'undefined' && document.querySelector) {
    initScrub(document, window);
  }

  return {
    sceneProgress: sceneProgress,
    viewProgress: viewProgress,
    band: band,
    easeOutCubic: easeOutCubic
  };
}));
