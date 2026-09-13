/* Progress rail (task-timeline-progress).
 *
 * Pure helper first (UMD): fraction of the story scrolled, clamped to
 * [0, 1] and robust to missing metrics. The DOM wiring below is thin:
 * one rAF-throttled scroll handler updates the fill, the progressbar
 * semantics and the active chapter dot.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.computeProgress = api.computeProgress;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Scroll progress through the document.
   * @param {number} scrollY  Current scroll offset.
   * @param {number} docHeight Full document height (px).
   * @param {number} winHeight Viewport height (px).
   * @returns {number} 0..1
   */
  function computeProgress(scrollY, docHeight, winHeight) {
    var scrollable = docHeight - winHeight;
    if (!isFinite(scrollable) || scrollable <= 0) return 0;
    var fraction = scrollY / scrollable;
    if (!isFinite(fraction) || fraction < 0) return 0;
    return fraction > 1 ? 1 : fraction;
  }

  return { computeProgress: computeProgress };
}));

(function () {
  'use strict';

  if (typeof document === 'undefined' || !document.querySelector) return; // Node/tests

  var rail = document.querySelector('.rail');
  if (!rail) return;

  var fill = rail.querySelector('.rail-fill');
  var track = rail.querySelector('.rail-track');
  var links = Array.prototype.slice.call(rail.querySelectorAll('[data-rail-link]'));
  var scenes = links.map(function (link) {
    return document.getElementById(link.dataset.railLink);
  }).filter(Boolean);

  var ticking = false;

  function setActive(id) {
    links.forEach(function (link) {
      if (link.dataset.railLink === id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var fraction = computeProgress(window.scrollY || window.pageYOffset,
      doc.scrollHeight, window.innerHeight);

    if (fill) fill.style.setProperty('--progress', (fraction * 100).toFixed(2) + '%');
    if (track) {
      var pct = Math.round(fraction * 100);
      track.setAttribute('aria-valuenow', String(pct));
    }

    /* The chapter whose section contains the viewport midpoint is active. */
    var mid = window.innerHeight / 2;
    var current = scenes[0];
    for (var i = 0; i < scenes.length; i++) {
      var rect = scenes[i].getBoundingClientRect();
      if (rect.top <= mid) current = scenes[i];
    }
    if (current) setActive(current.id);
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
