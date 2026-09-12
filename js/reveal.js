/* Reveal orchestration state machine (task-timeline-reveal).
 *
 * Pure logic, no DOM: the browser engine (js/engine.js) wires it to
 * IntersectionObserver events; tests (tests/reveal.test.cjs) drive it
 * directly. Enforces the story contract:
 *
 *   - every scene animates exactly once (enter on a revealed scene is a no-op)
 *   - scenes animate in document order: entering scene N instantly reveals
 *     any still-hidden scene before N (catch-up), so rail jumps and fast
 *     scrolls never leave earlier chapters unanimated or re-trigger jank
 *   - exiting changes nothing: state is terminal by design
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.createRevealOrchestrator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * @param {Object}   options
   * @param {string[]} options.ids        Scene ids in document order.
   * @param {Function} options.onAnimate  (id) => play the entrance animation.
   * @param {Function} options.onCatchUp  (id) => reveal instantly, no animation.
   * @returns {{enter: Function, exit: Function, isRevealed: Function, revealedCount: Function}}
   */
  return function createRevealOrchestrator(options) {
    var ids = options.ids;
    var onAnimate = options.onAnimate || function () {};
    var onCatchUp = options.onCatchUp || function () {};

    var index = {};
    var revealed = {};
    ids.forEach(function (id, i) {
      index[id] = i;
      revealed[id] = false;
    });

    function revealUpTo(target) {
      for (var i = 0; i < index[target]; i++) {
        var id = ids[i];
        if (!revealed[id]) {
          revealed[id] = true;
          onCatchUp(id);
        }
      }
    }

    return {
      enter: function (id) {
        if (!(id in index) || revealed[id]) {
          return 'ignored';
        }
        revealUpTo(id);
        revealed[id] = true;
        onAnimate(id);
        return 'animated';
      },

      /* Exiting never rewinds: scenes animate once, in order. */
      exit: function (id) {
        return (id in index) ? 'noted' : 'ignored';
      },

      isRevealed: function (id) {
        return !!revealed[id];
      },

      revealedCount: function () {
        return ids.filter(function (id) { return revealed[id]; }).length;
      }
    };
  };
}));
