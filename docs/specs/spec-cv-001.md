---
spec_id: cv-001
title: arggon-cv — online storytelling CV with scroll animations
status: approved
created: 2026-09-11
updated: 2026-09-12
---

# Spec: arggon-cv (cv-001)

## 1. Purpose

A single-page, dependency-free site that tells Gonzalo's journey as seven animated
chapters: first computer → crack-era gaming → self-taught networking → SQL
injections on Mu Online/Lineage private-server sites at 16 → Software Engineering
→ Tecnico Programador Universitario (UTN FRT, 2021) → junior-to-senior career
since 2021 (.NET Core; Senior AI Software Engineer at GlobalLogic/Coalfire).

## 2. Design

- Static and self-hostable: vanilla HTML/CSS/JS, no framework, no build step.
- **Dark modern minimalist** (user-approved 2026-09-12): deep navy background with a
  single green accent, inspired by brittanychiang.com — not full phosphor-terminal.
  Terminal-era nods stay as accents only: mono font details, short skippable boot
  intro, cursor blink, subtle scanline/glint on chapter 1.
- **Scroll-driven storytelling** in the spirit of everylastdrop.co.uk: full-viewport
  chapter scenes, one continuous story, progress rail.
- **unseen.co-inspired motion**: smooth lerped scrolling, staggered text/clip reveals,
  parallax layers, magnetic hover on CTAs, marquee for the tech stack.
- `prefers-reduced-motion` disables lerped scroll, parallax and autoplaying motion.
- Honest and tasteful about the crack era: it is the origin story of the curiosity, not a how-to.

## 3. Structure

Seven full-viewport scenes + header/footer, a vertical progress rail with chapter
jumps, OG/meta cards for share previews, and a link to the PDF CV as fallback.
**Bilingual EN/ES with a header toggle** (persisted in localStorage); contact =
email + LinkedIn (no phone on the public site). Content source of truth is the
copy embedded in `index.html` with `data-i18n` keys (kept in `js/i18n.js`).

## 4. Acceptance

- [ ] Seven chapters with per-chapter animations, reveal-once orchestration
- [ ] Rail navigation, reduced-motion fallback, AA contrast
- [ ] EN/ES toggle working; contact = email + LinkedIn
- [ ] Deployed (GitHub Pages) with verified preview cards
