/* Chapter 4 — SQL injection at 16 (task-anim-sql-injection).
 *
 * A mock 2005-era login types `' OR 1=1 --`, a check line appears,
 * the returned rows light up one by one, and the lesson lands last:
 * magic back then, unsanitized input today. Reduced motion: everything
 * visible, static.
 */
(function () {
  'use strict';

  var INPUT = "' OR 1=1 --";
  var ROW_COUNT = 4;

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch4 = function (stage, reducedMotion) {
    var input = stage.querySelector('.term-input');
    var check = stage.querySelector('.term-check');
    var rowsBox = stage.querySelector('.term-rows');
    var rows = stage.querySelectorAll('.term-row');
    var lesson = stage.querySelector('.term-lesson');
    if (!input || !check || !rowsBox) return;

    if (reducedMotion) {
      input.textContent = INPUT;
      check.classList.add('is-shown');
      rowsBox.classList.add('is-shown');
      rows.forEach(function (row) { row.classList.add('is-lit'); });
      if (lesson) lesson.classList.add('is-shown');
      return;
    }

    window.planSqliScene({
      input: INPUT,
      rows: new Array(ROW_COUNT),
      charDelay: 90,
      rowDelay: 320,
    }).steps.forEach(function (step) {
      setTimeout(function () {
        if (step.phase === 'type') {
          input.textContent = step.text;
        } else if (step.phase === 'check') {
          check.classList.add('is-shown');
          rowsBox.classList.add('is-shown');
        } else if (step.phase === 'row') {
          var row = rows[step.index];
          if (row) row.classList.add('is-lit');
        } else if (step.phase === 'lesson' && lesson) {
          lesson.classList.add('is-shown');
        }
      }, step.time);
    });
  };
})();
