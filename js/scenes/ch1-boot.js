/* Chapter 1 — CRT boot (task-anim-crt-boot, task-scrub-scenes).
 *
 * Scroll-scrubbed: the monitor flickers on as the chapter pins, then the
 * boot text types forward AND backward with scroll (state is a pure
 * function of progress). Boot lines come from the i18n dictionary; a BIOS
 * boot is authentic hardware copy, so both languages share the same
 * English lines. Reduced motion: screen on, all lines visible, static.
 */
(function () {
  'use strict';

  function bootLines() {
    return (window.cvI18n && window.cvI18n.t('ch1.bootLines')) ||
      ['ARGGON BIOS v1.0 - CORDOBA, AR', 'LOADING STORY.EXE'];
  }

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch1 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var boot = stage.querySelector('.crt-boot');
    var crt = stage.querySelector('.crt');
    if (!boot || !crt) return;

    var lineEls = [];

    function ensureLines(count) {
      while (lineEls.length < count) {
        var lineEl = document.createElement('span');
        lineEl.className = 'crt-line';
        boot.appendChild(lineEl);
        boot.appendChild(document.createTextNode('\n'));
        lineEls.push(lineEl);
      }
    }

    function paintFinal() {
      crt.classList.add('is-on');
      boot.textContent = '';
      lineEls = [];
      ensureLines(bootLines().length);
      bootLines().forEach(function (line, i) {
        lineEls[i].textContent = line;
      });
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      document.addEventListener('cv:langchange', paintFinal);
      return;
    }

    return function render(p) {
      var lines = bootLines();
      ensureLines(lines.length);

      /* Power-on is a one-shot CSS animation; crossing the threshold
         either way retriggers it. */
      crt.classList.toggle('is-on', p > 0.04);

      var total = 0;
      lines.forEach(function (line) { total += line.length; });
      var t = scrub.band(p, 0.12, 0.78);
      var shown = Math.round(total * scrub.easeOutCubic(t));

      var remaining = shown;
      var cursorLine = -1;
      lineEls.forEach(function (el) { el.classList.remove('is-typing'); });

      for (var i = 0; i < lines.length && remaining >= 0; i++) {
        var take = Math.min(lines[i].length, remaining);
        lineEls[i].textContent = lines[i].slice(0, take);
        remaining -= take;
        if (t > 0 && t < 1 && cursorLine === -1) {
          cursorLine = take < lines[i].length ? i : Math.min(i + 1, lines.length - 1);
        }
      }
      if (cursorLine > -1) {
        lineEls[cursorLine].classList.add('is-typing');
      }
    };
  };
})();
