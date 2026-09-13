/* Motion polish (task-motion-polish) — unseen.co-inspired touches.
 *
 * Pure helpers first (UMD): clamped scroll-velocity skew, pointer magnet,
 * depth parallax and the eased anchor interpolator. The DOM wiring below is
 * thin and shares one rAF loop; every effect is gated behind
 * `prefers-reduced-motion: reduce` (checked live, so flipping the OS setting
 * mid-visit disables the layer without a reload).
 *
 * Effects:
 *   - velocity skew: `.scene-stage` tilts a fraction of a degree with smoothed
 *     scroll velocity, settling back to 0 when scrolling stops (the lerp is
 *     what sells the premium feel — direct velocity reads look twitchy).
 *   - depth parallax: each non-empty `.scene-stage` drifts against its
 *     distance to the viewport midline, so scenes read as layered cards.
 *   - magnetic links: contact/footer links lean a few px toward the pointer.
 *   - eased anchors: rail jumps glide instead of teleporting; focus still
 *     moves to the target for keyboard and screen-reader users.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.motionApi = api;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Exponential smoothing step: move current toward target.
   * @param {number} current Smoothed value so far.
   * @param {number} target  Raw value.
   * @param {number} factor  0..1 (higher = snappier).
   * @returns {number}
   */
  function lerp(current, target, factor) {
    if (!isFinite(current) || !isFinite(target)) return target;
    return current + (target - current) * factor;
  }

  /**
   * Skew angle for a raw scroll velocity, clamped to ±max.
   * @param {number} velocity Px/frame delta (may be any sign).
   * @param {number} max      Max |angle| in degrees.
   * @returns {number} Degrees to feed skewY().
   */
  function velocitySkew(velocity, max) {
    if (!isFinite(velocity) || !isFinite(max) || max <= 0) return 0;
    var angle = velocity * 0.12;
    if (angle > max) angle = max;
    if (angle < -max) angle = -max;
    return Math.round(angle * 1000) / 1000;
  }

  /**
   * Parallax drift for a stage, from its viewport position.
   * Elements above the midline get positive offsets, below negative, so the
   * stage scrolls slightly slower than the copy (a depth cue, not a ride).
   * @param {number} midDelta stageCenterY - viewportMidY (px).
   * @param {number} strength Fraction of midDelta to apply (0..0.5 sensible).
   * @returns {number} translateY px.
   */
  function parallaxOffset(midDelta, strength) {
    if (!isFinite(midDelta)) return 0;
    if (!isFinite(strength) || strength < 0) strength = 0;
    if (strength > 1) strength = 1;
    var offset = -(midDelta * strength);
    return offset === 0 ? 0 : offset; /* normalize -0 */
  }

  /**
   * Magnetic pull: how far a link should lean toward the pointer.
   * @param {number} px      Pointer x relative to element center.
   * @param {number} py      Pointer y relative to element center.
   * @param {number} max     Max |offset| per axis in px.
   * @returns {{x: number, y: number}} Translation in px.
   */
  function magnetOffset(px, py, max) {
    if (!isFinite(px) || !isFinite(py)) return { x: 0, y: 0 };
    var cap = (isFinite(max) && max > 0) ? max : 6;
    return {
      x: Math.max(-cap, Math.min(cap, px * 0.25)),
      y: Math.max(-cap, Math.min(cap, py * 0.25))
    };
  }

  /**
   * Ease-in-out cubic progress curve for the anchor glide.
   * @param {number} t Progress 0..1.
   * @returns {number} Eased 0..1.
   */
  function easeInOutCubic(t) {
    if (!isFinite(t) || t <= 0) return 0;
    if (t >= 1) return 1;
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* DOM wiring ------------------------------------------------------------- */

  function initMotion(doc, win) {
    var reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    var stages = Array.prototype.slice.call(doc.querySelectorAll('.scene-stage'))
      .filter(function (stage) { return stage.children.length > 0; });
    var magnetLinks = Array.prototype.slice.call(doc.querySelectorAll(
      '.chapter-contact a, .site-footer a'));

    /* Velocity skew + parallax: one scroll-driven rAF loop, idles to a stop. */
    var raf = null;
    var lastY = win.scrollY || win.pageYOffset || 0;
    var smoothV = 0;
    var smoothParallax = stages.map(function () { return 0; });

    function applyFrame() {
      raf = null;
      var y = win.scrollY || win.pageYOffset || 0;
      smoothV = lerp(smoothV, y - lastY, 0.12);
      lastY = y;

      var midY = win.innerHeight / 2;
      var settled = Math.abs(smoothV) < 0.1;
      var mid = win.innerHeight * 1.2; /* keep animating while stages are near */

      stages.forEach(function (stage, i) {
        var rect = stage.getBoundingClientRect();
        if (rect.bottom < -mid || rect.top > win.innerHeight + mid) return;
        var target = parallaxOffset(rect.top + rect.height / 2 - midY, 0.05);
        smoothParallax[i] = lerp(smoothParallax[i], target, 0.14);
        var skew = velocitySkew(smoothV, 1.6);
        stage.style.transform = 'translate3d(0, ' + smoothParallax[i].toFixed(2) +
          'px, 0) skewY(' + skew + 'deg)';
        settled = settled && Math.abs(smoothParallax[i] - target) < 0.1;
      });

      if (!settled || Math.abs(smoothV) >= 0.1) {
        raf = win.requestAnimationFrame(applyFrame);
      }
    }

    function requestFrame() {
      if (raf === null && !reduced.matches) {
        raf = win.requestAnimationFrame(applyFrame);
      }
    }

    /* Eased anchor glides for the rail (native jump stays for reduced motion). */
    function bindAnchors() {
      var links = Array.prototype.slice.call(doc.querySelectorAll('[data-rail-link]'));
      links.forEach(function (link) {
        link.addEventListener('click', function (event) {
          if (reduced.matches) return; /* native jump */
          var target = doc.getElementById(link.dataset.railLink);
          if (!target) return;
          event.preventDefault();
          var from = win.scrollY || win.pageYOffset || 0;
          var to = target.getBoundingClientRect().top + from;
          var distance = Math.abs(to - from);
          var duration = Math.min(900, Math.max(400, distance * 0.35));
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var t = Math.min(1, (ts - start) / duration);
            /* behavior:'instant' — this loop IS the easing; the html-level
               smooth scroll would restart an animation on every frame. */
            win.scrollTo({ top: from + (to - from) * easeInOutCubic(t), behavior: 'instant' });
            if (t < 1) {
              win.requestAnimationFrame(step);
            } else {
              target.setAttribute('tabindex', '-1');
              target.focus({ preventScroll: true });
              if (win.history && win.history.pushState) {
                win.history.pushState(null, '', '#' + target.id);
              }
            }
          }
          win.requestAnimationFrame(step);
        });
      });
    }

    /* Magnetic links: lean toward the pointer, spring back on leave. */
    function bindMagnets() {
      magnetLinks.forEach(function (link) {
        link.addEventListener('pointermove', function (event) {
          if (reduced.matches) return;
          var rect = link.getBoundingClientRect();
          var pull = magnetOffset(
            event.clientX - (rect.left + rect.width / 2),
            event.clientY - (rect.top + rect.height / 2), 6);
          link.style.transform = 'translate(' + pull.x.toFixed(1) + 'px, ' +
            pull.y.toFixed(1) + 'px)';
        });
        link.addEventListener('pointerleave', function () {
          link.style.transform = '';
        });
      });
    }

    function bind() {
      win.addEventListener('scroll', requestFrame, { passive: true });
      win.addEventListener('resize', requestFrame);
      if (typeof reduced.addEventListener === 'function') {
        reduced.addEventListener('change', function () {
          if (reduced.matches) {
            if (raf !== null) { win.cancelAnimationFrame(raf); raf = null; }
            stages.forEach(function (stage) { stage.style.transform = ''; });
            magnetLinks.forEach(function (link) { link.style.transform = ''; });
          } else {
            requestFrame();
          }
        });
      }
      bindAnchors();
      bindMagnets();
    }

    if (stages.length > 0 || magnetLinks.length > 0) bind();
  }

  if (typeof document !== 'undefined' && document.querySelector) {
    initMotion(document, window);
  }

  return {
    lerp: lerp,
    velocitySkew: velocitySkew,
    parallaxOffset: parallaxOffset,
    magnetOffset: magnetOffset,
    easeInOutCubic: easeInOutCubic
  };
}));
