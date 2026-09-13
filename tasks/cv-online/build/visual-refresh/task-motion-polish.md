---
type: task
status: in_progress
id: task-motion-polish
title: "Motion polish: skew, parallax, magnetic CTAs"
assignee: arggon
branch: feat/task-motion-polish
parent: visual-refresh
labels: []
created: "2026-09-13"
updated: "2026-09-13"
claimed_at: "2026-09-13T02:38:30.995Z"
worktree_path: /home/arggon/Projects/arggon-cv-task-motion-polish
---
<!--
  Placement (v0): tasks/cv-online/build/visual-refresh/task-motion-polish.md
  Leaves live only under a story. id is the filename stem: task-motion-polish.
  CLI `arggon create task motion-polish` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Motion polish: skew, parallax, magnetic CTAs

## Context

unseen.co-inspired touches, all vanilla: scroll-velocity skew on scene stages,
subtle parallax on stage layers, magnetic hover on contact/footer links, eased
anchor scrolling for rail jumps, ambient gradient drift on the page background.
Everything gated behind a prefers-reduced-motion guard and a single rAF loop.

## Acceptance

- [ ] New js/motion.js wired; no jank (transform/opacity only, one rAF)
- [ ] Reduced-motion disables every added effect
- [ ] Existing tests still pass; new unit test for the motion module helpers
