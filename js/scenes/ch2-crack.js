/* Chapter 2 — the crack era (task-anim-crack-era).
 *
 * Game covers pop in, a search cursor types curiosity-driven queries
 * (why the disc check, what a checksum is — the learning, not the
 * piracy), and forum-thread cards slide in. Nostalgia, not how-to.
 * Queries come from the i18n dictionary (js/i18n.js); a language
 * switch cancels the pending timers and settles the search bar on the
 * final query in the new language. Reduced motion: everything shown
 * at once, static.
 */
(function () {
  'use strict';

  function queries() {
    return (window.cvI18n && window.cvI18n.t('ch2.queries')) ||
      ['why does the game check the disc'];
  }

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch2 = function (stage, reducedMotion) {
    var search = stage.querySelector('.search-text');
    var searchWrap = stage.querySelector('.searchbar');
    var covers = stage.querySelectorAll('.cover');
    var cards = stage.querySelectorAll('.forum-card');
    if (!search || !searchWrap) return;

    var timers = [];

    if (reducedMotion) {
      var settled = queries();
      search.textContent = settled[settled.length - 1];
      searchWrap.classList.add('is-settled');
      covers.forEach(function (c) { c.classList.add('is-shown'); });
      cards.forEach(function (c) { c.classList.add('is-shown'); });
      return;
    }

    var list = queries();
    var plan = window.planQueryLoop(list, { charDelay: 45, hold: 1100, clearGap: 250 });
    var current = -1;

    plan.steps.forEach(function (step) {
      timers.push(setTimeout(function () {
        if (step.action === 'clear') {
          search.textContent = '';
          current = step.queryIndex;
        } else if (step.action === 'type') {
          if (current !== step.queryIndex) {
            current = step.queryIndex;
            search.textContent = '';
          }
          search.textContent = step.text;
        } else if (step.action === 'hold' && step.queryIndex === list.length - 1) {
          searchWrap.classList.add('is-settled');
        }
      }, step.time));
    });

    covers.forEach(function (cover, i) {
      timers.push(setTimeout(function () { cover.classList.add('is-shown'); }, 200 + i * 160));
    });

    var cardsAt = plan.totalMs + 300;
    cards.forEach(function (card, i) {
      timers.push(setTimeout(function () { card.classList.add('is-shown'); }, cardsAt + i * 220));
    });

    document.addEventListener('cv:langchange', function () {
      timers.forEach(clearTimeout);
      timers = [];
      /* The hunt already played — settle on the final query, new language. */
      var fresh = queries();
      search.textContent = fresh[fresh.length - 1];
      searchWrap.classList.add('is-settled');
    });
  };
})();
