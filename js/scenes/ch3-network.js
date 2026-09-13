/* Chapter 3 — networking basics (task-anim-networking, task-scrub-scenes).
 *
 * Scroll-scrubbed: nodes wake left to right as the chapter pins, their
 * links go live (packets travel on CSS time once live), the firewall
 * absorbs one packet, and the port panel scans open near the end.
 * Reduced motion: whole diagram lit and static, no packets.
 */
(function () {
  'use strict';

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch3 = function (stage, reducedMotion) {
    var scrub = window.scrubApi;
    var network = stage.querySelector('.network');
    if (!network) return;

    var nodes = stage.querySelectorAll('.net-node');
    var links = stage.querySelectorAll('.net-link');
    var ports = stage.querySelectorAll('.port');

    function paintFinal() {
      nodes.forEach(function (n) { n.classList.add('is-lit'); });
      links.forEach(function (l) { l.classList.add('is-live'); });
      ports.forEach(function (p) { p.classList.add('is-open'); });
    }

    if (reducedMotion || !scrub) {
      paintFinal();
      return;
    }

    return function render(p) {
      /* Node i lights at its own slice of the first half of the pin;
         link i leaves node i, so it goes live with its source. */
      nodes.forEach(function (node, i) {
        var lit = scrub.band(p, 0.06 + i * 0.11, 0.14 + i * 0.11) >= 1;
        node.classList.toggle('is-lit', lit);
        var link = links[i];
        if (link) link.classList.toggle('is-live', lit);
      });

      /* Port scan sweeps the second half. */
      ports.forEach(function (port, i) {
        var opened = scrub.band(p, 0.6, 0.92) * ports.length;
        port.classList.toggle('is-open', i + 1 <= opened);
      });
    };
  };
})();
