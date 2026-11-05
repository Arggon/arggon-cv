---
type: bug
status: in_progress
id: bug-es-locale-and-pdf
title: "ES locale: CV copy and Spanish PDF"
assignee: Arggon
branch: cursor/es-cv-body-d010
parent: story-deploy
labels: []
created: "2026-11-05"
updated: "2026-11-05"
---
<!--
  Placement (v0): tasks/cv-online/ship/story-deploy/bug-es-locale-and-pdf.md
  Leaves live only under a story. id is the filename stem: bug-es-locale-and-pdf.
  CLI `arggon create bug es-locale-and-pdf` adds the bug- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# ES locale: CV copy and Spanish PDF

## Context

On https://arggon.github.io/arggon-cv/, choosing ES switched the chrome and the chapter paragraphs, and left two CV surfaces in English. The chapter 8 stack phrases (Clean Architecture, Spec-Driven Development, Rust (learning)) had no data-i18n. A settled chapter 2 scene kept the English search query, because the timeline did not redraw on cv:langchange. Both CV download links always pointed at assets/Gonzalo-Arganaraz-CV.pdf.

## Acceptance

- [x] Spanish stack phrases and the settled chapter 2 search follow the locale
- [x] Hero and footer CV links use the Spanish PDF on ES and the English PDF on EN, including after a runtime switch
- [x] English PDF path assets/Gonzalo-Arganaraz-CV.pdf is unchanged; Spanish file is assets/Gonzalo-Arganaraz-CV-ES.pdf
- [x] node tests and arggon validate pass

## Notes

Tracked on PR #32. Status stays in_progress until that PR merges.
