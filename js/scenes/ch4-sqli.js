/* Chapter 4 — SQL injection at 16 (task-anim-sql-injection, task-scrub-scenes).
 *
 * Scroll-scrubbed: the login types `' OR 1=1 --` with scroll, the check
 * line lands, rows light one by one, and the lesson closes the chapter.
 * Pure function of progress both ways. Reduced motion: everything
 * visible, static.
 */
(function () {
  'use strict';

  var INPUT = "' OR 1=1 --";

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch4 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var input = stage.querySelector('.term-input');
    var check = stage.querySelector('.term-check');
    var rowsBox = stage.querySelector('.term-rows');
    var rows = stage.querySelectorAll('.term-row');
    var lesson = stage.querySelector('.term-lesson');
    if (!input || !check || !rowsBox) return;

    function paintFinal() {
      input.textContent = INPUT;
      check.classList.add('is-shown');
      rowsBox.classList.add('is-shown');
      rows.forEach(function (row) { row.classList.add('is-lit'); });
      if (lesson) lesson.classList.add('is-shown');
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      return;
    }

    return function render(p) {
      var t = scrub.band(p, 0.1, 0.45);
      input.textContent = INPUT.slice(0, Math.round(INPUT.length * scrub.easeOutCubic(t)));

      var revealed = p > 0.5;
      check.classList.toggle('is-shown', revealed);
      rowsBox.classList.toggle('is-shown', revealed);

      rows.forEach(function (row, i) {
        var lit = scrub.band(p, 0.55, 0.85) * rows.length;
        row.classList.toggle('is-lit', i + 1 <= lit);
      });

      if (lesson) lesson.classList.toggle('is-shown', p > 0.9);
    };
  };
})();
