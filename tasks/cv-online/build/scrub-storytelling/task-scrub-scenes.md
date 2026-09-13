---
type: task
status: done
id: task-scrub-scenes
title: Progress-driven scene renderers
assignee: arggon
branch: feat/task-scrub-scenes
parent: scrub-storytelling
labels: []
created: "2026-09-13"
updated: "2026-09-13"
worktree_path: /home/arggon/Projects/arggon-cv-task-scrub-scenes
---
<!--
  Placement (v0): tasks/cv-online/build/scrub-storytelling/task-scrub-scenes.md
  Leaves live only under a story. id is the filename stem: task-scrub-scenes.
  CLI `arggon create task scrub-scenes` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Progress-driven scene renderers

## Context

Convert ch1-ch6 stage animations from setTimeout schedules to render(progress)
functions that precompute their plans (boot lines, query loop, sqli plan, port
scan) and apply the state at effective time = progress * total. Language switch
rebuilds plans, so ES/EN works mid-scroll. ch7 keeps the time-based marquee.

## Acceptance

- [ ] ch1-ch6 scrub forward AND backward with scroll; no orphan timers
- [ ] i18n works at any scrub position; existing pure-module tests stay green
