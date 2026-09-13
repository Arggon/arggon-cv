/* Chapter 2 — the crack era (task-anim-crack-era, task-scrub-scenes).
 *
 * Scroll-scrubbed: covers pop in with scroll, the search bar types the
 * curiosity-driven queries forward and backward (pure function of
 * progress), forum cards land last. Queries come from the i18n
 * dictionary, read every frame, so a language switch mid-scroll just
 * works. Nostalgia, not how-to. Reduced motion: everything shown,
 * static.
 */
(function () {
  'use strict';

  function queries() {
    return (window.cvI18n && window.cvI18n.t('ch2.queries')) ||
      ['why does the game check the disc'];
  }

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch2 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var search = stage.querySelector('.search-text');
    var searchWrap = stage.querySelector('.searchbar');
    var covers = stage.querySelectorAll('.cover');
    var cards = stage.querySelectorAll('.forum-card');
    if (!search || !searchWrap) return;

    function paintFinal() {
      var list = queries();
      search.textContent = list[list.length - 1];
      searchWrap.classList.add('is-settled');
      covers.forEach(function (c) { c.classList.add('is-shown'); });
      cards.forEach(function (c) { c.classList.add('is-shown'); });
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      document.addEventListener('cv:langchange', paintFinal);
      return;
    }

    return function render(p) {
      var list = queries();

      /* Covers: staggered pops across the first stretch of the pin. */
      covers.forEach(function (cover, i) {
        var threshold = 0.06 + (scrub.band(p, 0.06, 0.4) * covers.length);
        cover.classList.toggle('is-shown', i + 1 <= threshold);
      });

      /* Search: 4 query slots inside one band; each slot spends its
         first 70% typing and the rest holding. */
      var t = scrub.band(p, 0.35, 0.78);
      var slots = list.length;
      var k = Math.min(slots - 1, Math.floor(t * slots));
      var sub = t * slots - k;
      var text = '';
      if (t > 0 && sub > 0) {
        var query = list[k];
        text = query.slice(0, Math.ceil(Math.min(1, sub / 0.7) * query.length));
      }
      search.textContent = text;
      searchWrap.classList.toggle('is-settled', p > 0.8);

      /* Forum threads land after the hunt. */
      cards.forEach(function (card, i) {
        var threshold = 0.82 + (scrub.band(p, 0.82, 0.97) * cards.length);
        card.classList.toggle('is-shown', i + 1 <= threshold);
      });
    };
  };
})();
