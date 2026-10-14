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

  /* task-motion-premium: the DOM layer is intentionally empty. Velocity
     skew and stage parallax made the chapter 6/7 diagrams wobble while
     scrolling, the eased anchor glide took over native scroll, and magnetic
     links fought the pointer. Native scroll (plus CSS scroll-behavior for
     rail anchors) is the only scroll motion now. The pure helpers stay
     exported for reuse and tests. */
  function initMotion() {}

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
