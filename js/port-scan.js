/* Port-scan planner (task-anim-networking).
 *
 * Pure timing for the chapter-3 port panel: each port lights up in
 * order with a fixed step delay. UMD so Node tests drive it.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.planPortScan = api.planPortScan;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * @param {Array<{port: number, name: string}>} ports
   * @param {number} [stepDelay=280]
   * @returns {{steps: Array<{time: number, index: number}>, totalMs: number}}
   */
  function planPortScan(ports, stepDelay) {
    var delay = typeof stepDelay === 'number' ? stepDelay : 280;

    /* Plain loop: callers may pass sparse arrays like `new Array(n)`,
       which forEach/map would silently skip. */
    var count = ports.length;
    var steps = [];
    for (var i = 0; i < count; i++) {
      steps.push({ time: i * delay, index: i });
    }
    return { steps: steps, totalMs: steps.length ? steps[steps.length - 1].time + delay : 0 };
  }

  return { planPortScan: planPortScan };
}));
