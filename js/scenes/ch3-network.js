/* Chapter 3 — networking basics (task-anim-networking).
 *
 * Nodes wake up left to right (PC -> router -> firewall -> server),
 * packets start traveling the links (one gets absorbed by the
 * firewall), and the port panel scans open. Reduced motion: the whole
 * diagram lit and static, no packets, no timers.
 */
(function () {
  'use strict';

  var PORTS = [
    { port: 21, name: 'ftp' },
    { port: 80, name: 'http' },
    { port: 443, name: 'https' },
    { port: 1433, name: 'mssql' },
    { port: 6112, name: 'game' },
  ];

  window.SceneFX = window.SceneFX || {};

  window.SceneFX.ch3 = function (stage, reducedMotion) {
    var network = stage.querySelector('.network');
    if (!network) return;

    var nodes = stage.querySelectorAll('.net-node');
    var links = stage.querySelectorAll('.net-link');
    var ports = stage.querySelectorAll('.port');

    if (reducedMotion) {
      nodes.forEach(function (n) { n.classList.add('is-lit'); });
      ports.forEach(function (p) { p.classList.add('is-open'); });
      return;
    }

    nodes.forEach(function (node, i) {
      setTimeout(function () {
        node.classList.add('is-lit');
        var link = links[i]; // link i leaves node i
        if (link) link.classList.add('is-live');
      }, 350 + i * 380);
    });

    window.planPortScan(PORTS, 280).steps.forEach(function (step) {
      setTimeout(function () {
        ports[step.index].classList.add('is-open');
      }, 2000 + step.time);
    });
  };
})();
