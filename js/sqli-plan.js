/* SQL-injection scene planner (task-anim-sql-injection).
 *
 * Pure timeline for the chapter-4 terminal: type the login input,
 * check, light up the returned rows, land the lesson. UMD so Node
 * tests drive it. Self-contained on purpose — the composition is the
 * behavior under test.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.planSqliScene = api.planSqliScene;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * @param {Object} [opts] {input, rows, charDelay=90, checkDelay=700,
   *                        rowDelay=320, lessonDelay=900}
   * @returns {{steps: Array, totalMs: number}}
   *   step phases: 'type' {text} -> 'check' -> 'row' {index} -> 'lesson'
   */
  function planSqliScene(opts) {
    opts = opts || {};
    var input = typeof opts.input === 'string' ? opts.input : '';
    var rows = opts.rows || [];
    var charDelay = typeof opts.charDelay === 'number' ? opts.charDelay : 90;
    var checkDelay = typeof opts.checkDelay === 'number' ? opts.checkDelay : 700;
    var rowDelay = typeof opts.rowDelay === 'number' ? opts.rowDelay : 320;
    var lessonDelay = typeof opts.lessonDelay === 'number' ? opts.lessonDelay : 900;

    var steps = [];
    var time = 0;

    for (var i = 1; i <= input.length; i++) {
      time += charDelay;
      steps.push({ phase: 'type', time: time, text: input.slice(0, i) });
    }

    time += checkDelay;
    steps.push({ phase: 'check', time: time });

    /* Plain loop: callers may pass sparse arrays like `new Array(n)`. */
    var count = rows.length;
    for (var r = 0; r < count; r++) {
      time += rowDelay;
      steps.push({ phase: 'row', time: time, index: r });
    }

    time += lessonDelay;
    steps.push({ phase: 'lesson', time: time });

    return { steps: steps, totalMs: time };
  }

  return { planSqliScene: planSqliScene };
}));
