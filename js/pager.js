/* Chapter pager (task-chapter-pager) — one gesture, one chapter.
 *
 * The page keeps NATIVE document scroll (anchors, Tab focus, find-in-page and
 * screen readers all keep working). On top of it, when motion is allowed,
 * this layer turns a wheel flick, a swipe or a paging key into an eased
 * ~750 ms glide to the next/previous stop (hero, ch1..ch8, contact).
 *
 *   - Interruptible: a gesture the other way mid-glide retargets at once;
 *     the user is never locked out for longer than the glide itself.
 *   - Tall chapters (mostly mobile) scroll natively inside; the pager only
 *     takes over at the chapter's top/bottom edge.
 *   - Arriving sets .is-active on the stop and fires `chapter-arrive`
 *     (js/scrub.js replays that chapter's scene timeline from 0).
 *   - prefers-reduced-motion: reduce -> never binds; plain scrolling and
 *     static scenes. Toggling the preference live is honoured.
 *
 * Pure helpers first (UMD, Node-testable).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.pagerApi = api;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Index of the stop the reader is "in": the last stop whose top is at or
   * above the viewport's upper third.
   * @param {number[]} tops Document-space tops, ascending.
   * @param {number} scrollY
   * @param {number} viewHeight
   * @returns {number}
   */
  function currentIndex(tops, scrollY, viewHeight) {
    var line = scrollY + (isFinite(viewHeight) ? viewHeight : 0) * 0.34;
    var idx = 0;
    for (var i = 0; i < tops.length; i++) {
      if (tops[i] <= line) idx = i;
    }
    return idx;
  }

  /**
   * Should a gesture in `dir` page to another stop, or scroll natively
   * inside a stop taller than the viewport?
   * @param {number} dir 1 = down, -1 = up
   * @param {number} top    Current stop's top relative to the viewport (px).
   * @param {number} bottom Current stop's bottom relative to the viewport.
   * @param {number} viewHeight
   * @returns {boolean} true = page, false = native scroll
   */
  function shouldPage(dir, top, bottom, viewHeight) {
    var slack = 4;
    if (dir > 0) return bottom <= viewHeight + slack;
    if (dir < 0) return top >= -slack;
    return false;
  }

  /** Clamp a target stop index into range. */
  function clampIndex(i, count) {
    if (!isFinite(i) || count <= 0) return 0;
    return Math.max(0, Math.min(count - 1, Math.round(i)));
  }

  /**
   * Glide duration: quick for neighbours, capped for long rail jumps.
   * @param {number} distance px
   * @returns {number} ms (600..900)
   */
  function glideDuration(distance) {
    var d = Math.abs(distance);
    if (!isFinite(d)) return 600;
    return Math.round(Math.min(900, Math.max(600, 560 + d * 0.18)));
  }

  /** easeInOutQuart-ish glide: confident start, soft landing. */
  function glideEase(t) {
    if (!isFinite(t) || t <= 0) return 0;
    if (t >= 1) return 1;
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  /* DOM wiring ------------------------------------------------------------- */

  function initPager(doc, win) {
    var html = doc.documentElement;
    var reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    var stops = Array.prototype.slice.call(
      doc.querySelectorAll('.hero, [data-scene], #contact'));
    if (stops.length < 2) return;

    var bound = false;
    var anim = null;          // { raf, to, index }
    var active = -1;
    var lastWheelAt = 0;
    var wheelAccum = 0;
    var wheelLockedUntil = 0; // swallow trackpad inertia after a glide
    var touchStartY = null;
    var touchStartT = 0;
    var touchPaged = false;
    var settleTimer = null;
    var hud = doc.querySelector('[data-pager-hud]');
    var hudNow = hud && hud.querySelector('[data-pager-now]');

    function sy() { return win.scrollY || win.pageYOffset || 0; }
    function tops() {
      var y = sy();
      return stops.map(function (s) { return s.getBoundingClientRect().top + y; });
    }
    function indexNow() { return currentIndex(tops(), sy(), win.innerHeight); }

    function setActive(i, reason) {
      if (i === active) return;
      var prev = active;
      active = i;
      stops.forEach(function (s, k) {
        s.classList.toggle('is-active', k === i);
        s.classList.toggle('is-before', k < i);
      });
      if (hud) {
        var label = stops[i].getAttribute('data-pager-label') || '';
        hud.setAttribute('data-dir', i > prev ? 'down' : 'up');
        if (hudNow) {
          hudNow.textContent = label;
          hudNow.classList.remove('is-rolling');
          void hudNow.offsetWidth; /* restart the roll */
          hudNow.classList.add('is-rolling');
        }
        hud.classList.toggle('is-hidden', !label);
      }
      stops[i].dispatchEvent(new CustomEvent('chapter-arrive', {
        bubbles: true, detail: { index: i, id: stops[i].id, reason: reason }
      }));
    }

    function cancelGlide() {
      if (anim) { win.cancelAnimationFrame(anim.raf); anim = null; }
      html.classList.remove('is-gliding');
    }

    function goTo(i, reason) {
      i = clampIndex(i, stops.length);
      var from = sy();
      var fromIndex = anim ? anim.fromIndex : (active > -1 ? active : indexNow());
      var to = Math.round(stops[i].getBoundingClientRect().top + from);
      to = Math.min(to, html.scrollHeight - win.innerHeight);
      cancelGlide();
      win.clearTimeout(settleTimer);
      /* Activate on departure, so the incoming chapter's entrance plays
         while it slides in (the arrival, not the stop, is the show). */
      setActive(i, reason || 'gesture');
      if (Math.abs(to - from) < 2) return;
      var dur = glideDuration(to - from);
      var start = null;
      html.classList.add('is-gliding');
      html.setAttribute('data-glide', to > from ? 'down' : 'up');
      anim = { index: i, fromIndex: fromIndex, to: to, raf: 0 };
      function step(ts) {
        if (!anim) return;
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur);
        win.scrollTo({ top: from + (to - from) * glideEase(t), behavior: 'instant' });
        if (t < 1) {
          anim.raf = win.requestAnimationFrame(step);
        } else {
          anim = null;
          html.classList.remove('is-gliding');
          wheelLockedUntil = performance.now() + 140;
        }
      }
      anim.raf = win.requestAnimationFrame(step);
    }

    function page(dir, reason) {
      var base = anim ? anim.index : indexNow();
      goTo(base + dir, reason);
    }

    function canPage(dir) {
      if (anim) return true;
      var s = stops[indexNow()].getBoundingClientRect();
      /* The stop must also be (nearly) aligned before we take over. */
      return shouldPage(dir, s.top, s.bottom, win.innerHeight);
    }

    function onWheel(e) {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;
      if (!canPage(dir)) { wheelAccum = 0; return; } /* native inside tall chapter */
      e.preventDefault();
      var now = performance.now();
      if (now - lastWheelAt > 220) wheelAccum = 0;
      lastWheelAt = now;
      if (anim) {
        var animDir = anim.to > sy() ? 1 : -1;
        if (dir !== animDir) { wheelAccum = 0; goTo(anim.fromIndex, 'reverse'); }
        return; /* same-direction inertia during a glide is absorbed */
      }
      if (now < wheelLockedUntil) { wheelLockedUntil = now + 140; return; }
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) >= 24) {
        wheelAccum = 0;
        page(dir, 'wheel');
      }
    }

    /* Touch: the first real movement decides the gesture's mode, and it
       stays that way until the finger lifts. A gesture that started as a
       native scroll inside a tall chapter never turns into a page jump
       halfway (the browser would not let us cancel it anyway). */
    var touchMode = null; // 'page' | 'native' | null
    function onTouchStart(e) {
      if (e.touches.length !== 1) { touchStartY = null; return; }
      touchStartY = e.touches[0].clientY;
      touchStartT = performance.now();
      touchPaged = false;
      touchMode = null;
    }
    function onTouchMove(e) {
      if (touchStartY === null) return;
      var dy = touchStartY - e.touches[0].clientY;
      var dir = dy > 0 ? 1 : -1;
      if (touchMode === 'native') return;
      if (touchMode === null) {
        if (Math.abs(dy) < 6) return;
        touchMode = (e.cancelable && canPage(dir)) ? 'page' : 'native';
        if (touchMode === 'native') return;
      }
      if (e.cancelable) e.preventDefault();
      if (!touchPaged && Math.abs(dy) > 36) { touchPaged = true; page(dir, 'touch'); }
    }
    function onTouchEnd() {
      touchStartY = null;
      touchPaged = false;
      touchMode = null;
    }

    var KEYS = { PageDown: 1, PageUp: -1, ArrowDown: 1, ArrowUp: -1, ' ': 1 };
    function onKey(e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 'Home') { e.preventDefault(); goTo(0, 'key'); return; }
      if (e.key === 'End') { e.preventDefault(); goTo(stops.length - 1, 'key'); return; }
      var dir = KEYS[e.key];
      if (!dir) return;
      if (e.key === ' ' && e.shiftKey) dir = -1;
      if (/^(BUTTON|A)$/.test(t && t.tagName) && e.key === ' ') return;
      /* Arrow keys keep their fine-grained native behaviour inside a tall
         chapter; paging keys always page at the edges. */
      if (!canPage(dir)) return;
      e.preventDefault();
      page(dir, 'key');
    }

    /* Rail / in-page anchors: glide to the target stop. */
    function onClick(e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var target = doc.getElementById(a.getAttribute('href').slice(1));
      if (!target) return;
      var stop = stops.filter(function (s) { return s === target || s.contains(target); })[0];
      if (!stop || stop !== target) return; /* deep links: native jump */
      e.preventDefault();
      goTo(stops.indexOf(stop), 'link');
      if (win.history && win.history.pushState) win.history.pushState(null, '', '#' + target.id);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }

    /* Native scroll (tall chapters, Tab focus, find-in-page, scrollbar):
       keep .is-active in sync once the page settles. */
    function onScroll() {
      if (anim) return;
      win.clearTimeout(settleTimer);
      settleTimer = win.setTimeout(function () { if (!anim) setActive(indexNow(), 'scroll'); }, 90);
    }

    function onFocusIn(e) {
      if (anim) return;
      var i = -1;
      stops.forEach(function (s, k) { if (s.contains(e.target)) i = k; });
      if (i > -1) setActive(i, 'focus');
    }

    function interrupt() { if (anim) cancelGlide(); }

    function bind() {
      if (bound) return;
      bound = true;
      html.classList.add('paged');
      stops.forEach(function (s) {
        var label = s.getAttribute('data-pager-label');
        if (!label || s.querySelector('.chapter-numeral')) return;
        var n = doc.createElement('span');
        n.className = 'chapter-numeral';
        n.setAttribute('aria-hidden', 'true');
        n.textContent = label;
        s.insertBefore(n, s.firstChild);
      });
      win.addEventListener('wheel', onWheel, { passive: false });
      win.addEventListener('touchstart', onTouchStart, { passive: true });
      win.addEventListener('touchmove', onTouchMove, { passive: false });
      win.addEventListener('touchend', onTouchEnd, { passive: true });
      win.addEventListener('keydown', onKey);
      win.addEventListener('scroll', onScroll, { passive: true });
      win.addEventListener('mousedown', interrupt, { passive: true }); /* scrollbar drag */
      doc.addEventListener('click', onClick);
      doc.addEventListener('focusin', onFocusIn);
      active = -1;
      setActive(indexNow(), 'init');
    }

    function unbind() {
      if (!bound) return;
      bound = false;
      cancelGlide();
      html.classList.remove('paged');
      win.removeEventListener('wheel', onWheel, { passive: false });
      win.removeEventListener('touchstart', onTouchStart, { passive: true });
      win.removeEventListener('touchmove', onTouchMove, { passive: false });
      win.removeEventListener('touchend', onTouchEnd, { passive: true });
      win.removeEventListener('keydown', onKey);
      win.removeEventListener('scroll', onScroll, { passive: true });
      win.removeEventListener('mousedown', interrupt, { passive: true });
      doc.removeEventListener('click', onClick);
      doc.removeEventListener('focusin', onFocusIn);
      stops.forEach(function (s) { s.classList.remove('is-active', 'is-before'); });
    }

    function sync() { if (reduced.matches) unbind(); else bind(); }
    if (typeof reduced.addEventListener === 'function') reduced.addEventListener('change', sync);
    sync();
    win.cvPager = { goTo: function (i) { if (bound) goTo(i, 'api'); } };
  }

  if (typeof document !== 'undefined' && document.querySelector) {
    initPager(document, window);
  }

  return {
    currentIndex: currentIndex,
    shouldPage: shouldPage,
    clampIndex: clampIndex,
    glideDuration: glideDuration,
    glideEase: glideEase
  };
}));
