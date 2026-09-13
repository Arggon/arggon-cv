/* Chapter 1 — CRT boot (task-anim-crt-boot).
 *
 * The monitor flickers on (CSS .is-on), then boot text types line by
 * line. Reduced motion: the screen is simply on, all lines visible.
 */
(function () {
  'use strict';

  var BOOT_LINES = [
    'ARGGON BIOS v1.0 - CORDOBA, AR',
    'MEMORY TEST ... 640K OK',
    'DETECTING CURIOSITY ... FOUND',
    'LOADING STORY.EXE',
  ];

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch1 = function (stage, reducedMotion) {
    var boot = stage.querySelector('.crt-boot');
    var crt = stage.querySelector('.crt');
    if (!boot || !crt) return;

    crt.classList.add('is-on');

    var lineEls = BOOT_LINES.map(function () {
      var line = document.createElement('span');
      line.className = 'crt-line';
      boot.appendChild(line);
      boot.appendChild(document.createTextNode('\n'));
      return line;
    });

    var steps = reducedMotion
      ? window.instantBoot(BOOT_LINES)
      : window.buildBootSchedule(BOOT_LINES, { charDelay: 26, lineDelay: 320 });

    var typing = null;
    steps.forEach(function (step) {
      setTimeout(function () {
        if (typing) typing.classList.remove('is-typing');
        var line = lineEls[step.lineIndex];
        line.textContent = step.text;
        line.classList.add('is-typing');
        typing = line;
      }, step.time);
    });
  };
})();
