---
type: task
status: done
id: task-timeline-progress
title: Scroll progress rail with chapter jump links
assignee: Arggon
branch: feat/task-timeline-progress
parent: story-timeline-nav
labels: []
created: "2026-09-12"
updated: "2026-09-13"
depends_on: [task-scaffold-shell]
worktree_path: /home/arggon/Projects/arggon-cv-task-timeline-progress
---
<!--
  Placement (v0): tasks/cv-online/build/story-timeline-nav/task-timeline-progress.md
  Leaves live only under a story. id is the filename stem: task-timeline-progress.
  CLI `arggon create task timeline-progress` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Scroll progress rail with chapter jump links

## Context

Vertical rail: chapter dots, scroll progress fill, click-to-jump.

## Acceptance

- [x] Rail tracks progress; keyboard accessible jump links
