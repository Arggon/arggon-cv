---
type: task
status: todo
id: task-restyle-palette
title: "Restyle palette: navy plus green accent"
parent: visual-refresh
labels: []
created: "2026-09-13"
updated: "2026-09-13"
---
<!--
  Placement (v0): tasks/cv-online/build/visual-refresh/task-restyle-palette.md
  Leaves live only under a story. id is the filename stem: task-restyle-palette.
  CLI `arggon create task restyle-palette` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Restyle palette: navy plus green accent

## Context

Swap tokens.css from phosphor-green-on-near-black to brittanychiang-inspired
deep navy (#0a192f family) with green accent (#64ffda family). Update hardcoded
colors in scene CSS, favicon.svg, regenerate og-card.png, update og:image:alt
wording. tests/contrast.test.cjs must stay green with the new pairs.

## Acceptance

- [ ] tokens.css + scene CSS use the navy/green palette; no phosphor remnants
- [ ] contrast test passes (AA) with new token pairs
- [ ] favicon + og-card regenerated in the new palette
