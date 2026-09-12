---
spec_id: cv-001
title: arggon-cv — online storytelling CV with scroll animations
status: proposed
created: 2026-09-11
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
- Dark terminal aesthetic (phosphor green on near-black) — the CRT era is the design language.
- Scroll-driven scenes (IntersectionObserver); `prefers-reduced-motion` respected.
- Honest and tasteful about the crack era: it is the origin story of the curiosity, not a how-to.

## 3. Structure

Seven full-viewport scenes + header/footer, a vertical progress rail with chapter
jumps, OG/meta cards for share previews, and a link to the PDF CV as fallback.
Content in `content/chapters.md` (source of truth for copy), EN.

## 4. Acceptance

- [ ] Seven chapters with per-chapter animations, reveal-once orchestration
- [ ] Rail navigation, reduced-motion fallback, AA contrast
- [ ] Deployed (GitHub Pages) with verified preview cards
