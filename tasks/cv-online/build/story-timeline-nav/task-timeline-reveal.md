---
type: task
status: todo
id: task-timeline-reveal
title: IntersectionObserver reveal orchestration
parent: story-timeline-nav
labels: []
created: "2026-09-12"
updated: "2026-09-12"
depends_on: [task-scaffold-shell]
---
<!--
  Placement (v0): tasks/cv-online/build/story-timeline-nav/task-timeline-reveal.md
  Leaves live only under a story. id is the filename stem: task-timeline-reveal.
  CLI `arggon create task timeline-reveal` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# IntersectionObserver reveal orchestration

## Context

Reveal orchestration: scenes animate once, in document order, no re-trigger jank.

## Acceptance

- [ ] Reveal state machine tested with the observer events
