/* Boot sequence schedule (task-anim-crt-boot).
 *
 * Pure timing math for typed boot text — UMD so Node tests drive it.
 * A step is {time, lineIndex, text}; text is always a prefix of its line.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.buildBootSchedule = api.buildBootSchedule;
    root.instantBoot = api.instantBoot;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function buildBootSchedule(lines, opts) {
    opts = opts || {};
    var charDelay = typeof opts.charDelay === 'number' ? opts.charDelay : 24;
    var lineDelay = typeof opts.lineDelay === 'number' ? opts.lineDelay : 260;

    var steps = [];
    var time = 0;
    lines.forEach(function (line, lineIndex) {
      for (var i = 1; i <= line.length; i++) {
        steps.push({ time: time, lineIndex: lineIndex, text: line.slice(0, i) });
        time += charDelay;
      }
      time += lineDelay; // pause between lines
    });
    return steps;
  }

  /* Reduced motion: every line appears at once, no timers. */
  function instantBoot(lines) {
    return lines.map(function (line, lineIndex) {
      return { time: 0, lineIndex: lineIndex, text: line };
    });
  }

  return { buildBootSchedule: buildBootSchedule, instantBoot: instantBoot };
}));
