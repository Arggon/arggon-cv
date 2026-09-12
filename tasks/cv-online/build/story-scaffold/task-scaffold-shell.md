---
type: task
status: in_progress
id: task-scaffold-shell
title: index.html + reset CSS + scroll-observer engine
assignee: Arggon
branch: feat/task-scaffold-shell
parent: story-scaffold
labels: []
created: "2026-09-12"
updated: "2026-09-12"
claimed_at: "2026-09-12T23:40:26.099Z"
worktree_path: /home/arggon/Projects/arggon-cv-task-scaffold-shell
---
<!--
  Placement (v0): tasks/cv-online/build/story-scaffold/task-scaffold-shell.md
  Leaves live only under a story. id is the filename stem: task-scaffold-shell.
  CLI `arggon create task scaffold-shell` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# index.html + reset CSS + scroll-observer engine

## Context

index.html with the seven section skeletons, reset CSS, and a ~50-line scroll-observer engine exposing `scene-enter`/`scene-exit` custom events.

## Acceptance

- [ ] Works file:// and any static server; no build step required
