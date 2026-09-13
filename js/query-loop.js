/* Search-query loop planner (task-anim-crack-era).
 *
 * Pure timing math for the chapter-2 search bar: type a query, hold,
 * clear, type the next. UMD so Node tests drive it. Steps carry an
 * action so the DOM layer stays declarative.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.planQueryLoop = api.planQueryLoop;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * @param {string[]} queries
   * @param {Object}  [opts] {charDelay=45, hold=1100, clearGap=250}
   * @returns {{steps: Array, totalMs: number}}
   *   step: {time, queryIndex, text?, action: 'clear'|'type'|'hold'}
   */
  function planQueryLoop(queries, opts) {
    opts = opts || {};
    var charDelay = typeof opts.charDelay === 'number' ? opts.charDelay : 45;
    var hold = typeof opts.hold === 'number' ? opts.hold : 1100;
    var clearGap = typeof opts.clearGap === 'number' ? opts.clearGap : 250;

    var steps = [];
    var time = 0;

    queries.forEach(function (query, qi) {
      if (qi > 0) {
        time += clearGap;
        steps.push({ time: time, queryIndex: qi, action: 'clear' });
      }
      for (var i = 1; i <= query.length; i++) {
        time += charDelay;
        steps.push({ time: time, queryIndex: qi, action: 'type', text: query.slice(0, i) });
      }
      time += hold;
      steps.push({ time: time, queryIndex: qi, action: 'hold' });
    });

    return { steps: steps, totalMs: time };
  }

  return { planQueryLoop: planQueryLoop };
}));
