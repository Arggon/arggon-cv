/* Chapter 2 — the crack era (task-anim-crack-era).
 *
 * Game covers pop in, a search cursor types curiosity-driven queries
 * (why the disc check, what a checksum is — the learning, not the
 * piracy), and forum-thread cards slide in. Nostalgia, not how-to.
 * Reduced motion: everything shown at once, static.
 */
(function () {
  'use strict';

  var QUERIES = [
    'why does the game check the disc',
    'no-cd patch explained',
    'what is a checksum',
    'how do forum searches work',
  ];

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch2 = function (stage, reducedMotion) {
    var search = stage.querySelector('.search-text');
    var searchWrap = stage.querySelector('.searchbar');
    var covers = stage.querySelectorAll('.cover');
    var cards = stage.querySelectorAll('.forum-card');
    if (!search || !searchWrap) return;

    if (reducedMotion) {
      search.textContent = QUERIES[QUERIES.length - 1];
      searchWrap.classList.add('is-settled');
      covers.forEach(function (c) { c.classList.add('is-shown'); });
      cards.forEach(function (c) { c.classList.add('is-shown'); });
      return;
    }

    var plan = window.planQueryLoop(QUERIES, { charDelay: 45, hold: 1100, clearGap: 250 });
    var current = -1;

    plan.steps.forEach(function (step) {
      setTimeout(function () {
        if (step.action === 'clear') {
          search.textContent = '';
          current = step.queryIndex;
        } else if (step.action === 'type') {
          if (current !== step.queryIndex) {
            current = step.queryIndex;
            search.textContent = '';
          }
          search.textContent = step.text;
        } else if (step.action === 'hold' && step.queryIndex === QUERIES.length - 1) {
          searchWrap.classList.add('is-settled');
        }
      }, step.time);
    });

    covers.forEach(function (cover, i) {
      setTimeout(function () { cover.classList.add('is-shown'); }, 200 + i * 160);
    });

    var cardsAt = plan.totalMs + 300;
    cards.forEach(function (card, i) {
      setTimeout(function () { card.classList.add('is-shown'); }, cardsAt + i * 220);
    });
  };
})();
