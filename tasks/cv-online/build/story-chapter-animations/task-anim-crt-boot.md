---
type: task
status: done
id: task-anim-crt-boot
title: "Ch1 CRT boot: first computer turns on"
assignee: Arggon
branch: feat/task-anim-crt-boot
parent: story-chapter-animations
labels: []
created: "2026-09-12"
updated: "2026-09-13"
depends_on: [task-scaffold-shell, task-scaffold-design]
worktree_path: /home/arggon/Projects/arggon-cv-task-anim-crt-boot
---
<!--
  Placement (v0): tasks/cv-online/build/story-chapter-animations/task-anim-crt-boot.md
  Leaves live only under a story. id is the filename stem: task-anim-crt-boot.
  CLI `arggon create task anim-crt-boot` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Ch1 CRT boot: first computer turns on

## Context

Chapter 1 scene: a CRT monitor flickers on, phosphor glow, boot text — the first computer.

## Acceptance

- [x] Scene animates on scroll-enter; reduced-motion shows static frame
