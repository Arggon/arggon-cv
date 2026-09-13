---
type: task
status: in_progress
id: task-scrub-engine
title: Sticky scenes with scroll-progress engine
assignee: arggon
branch: feat/task-scrub-engine
parent: scrub-storytelling
labels: []
created: "2026-09-13"
updated: "2026-09-13"
claimed_at: "2026-09-13T03:07:07.866Z"
worktree_path: /home/arggon/Projects/arggon-cv-task-scrub-engine
---
<!--
  Placement (v0): tasks/cv-online/build/scrub-storytelling/task-scrub-engine.md
  Leaves live only under a story. id is the filename stem: task-scrub-engine.
  CLI `arggon create task scrub-engine` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Sticky scenes with scroll-progress engine

## Context

Scenes become ~190vh tall with a 100vh sticky inner wrapper; a progress engine
maps scroll position within each scene to 0..1 and drives scene renderers every
frame (rAF-throttled, transform/opacity only). Pure helpers UMD + unit-tested;
reduced-motion collapses heights via CSS and renders final frames once.

## Acceptance

- [ ] Per-scene progress computed and dispatched on scroll/resize, both directions
- [ ] Sticky layout ships; old trigger-once stage animations replaced in a follow-up task
- [ ] Reduced motion: no sticky/scrub, single static final paint; unit tests for helpers
