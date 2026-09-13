/* Chapter 1 — CRT boot (task-anim-crt-boot).
 *
 * The monitor flickers on (CSS .is-on), then boot text types line by
 * line. Boot lines come from the i18n dictionary (js/i18n.js); a BIOS
 * boot is authentic hardware copy, so both languages share the same
 * English lines. A language switch mid-typing cancels the pending
 * timers and paints the settled frame. Reduced motion: the screen is
 * simply on, all lines visible.
 */
(function () {
  'use strict';

  function bootLines() {
    return (window.cvI18n && window.cvI18n.t('ch1.bootLines')) ||
      ['ARGGON BIOS v1.0 - CORDOBA, AR', 'LOADING STORY.EXE'];
  }

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch1 = function (stage, reducedMotion) {
    var boot = stage.querySelector('.crt-boot');
    var crt = stage.querySelector('.crt');
    if (!boot || !crt) return;

    var timers = [];

    function makeLineEls(lines) {
      return lines.map(function () {
        var line = document.createElement('span');
        line.className = 'crt-line';
        boot.appendChild(line);
        boot.appendChild(document.createTextNode('\n'));
        return line;
      });
    }

    crt.classList.add('is-on');

    var lineEls = makeLineEls(bootLines());
    var steps = reducedMotion
      ? window.instantBoot(bootLines())
      : window.buildBootSchedule(bootLines(), { charDelay: 26, lineDelay: 320 });

    var typing = null;
    steps.forEach(function (step) {
      timers.push(setTimeout(function () {
        if (typing) typing.classList.remove('is-typing');
        var line = lineEls[step.lineIndex];
        line.textContent = step.text;
        line.classList.add('is-typing');
        typing = line;
      }, step.time));
    });

    document.addEventListener('cv:langchange', function () {
      timers.forEach(clearTimeout);
      timers = [];
      typing = null;
      boot.textContent = '';
      /* The boot already played once — snap straight to the settled
         frame with the fresh language's lines. */
      makeLineEls(bootLines()).forEach(function (line, i) {
        line.textContent = bootLines()[i];
      });
    });
  };
})();
