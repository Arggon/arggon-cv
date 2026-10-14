---
type: task
status: in_progress
id: task-motion-rework-unpin-scenes-restrained-reveals
title: "Motion rework: unpin scenes, restrained reveals"
assignee: Arggon
parent: visual-refresh
labels: []
created: "2026-10-14"
updated: "2026-10-14"
claimed_at: "2026-10-14T14:41:44.648Z"
---
<!--
  Placement (v0): tasks/cv-online/build/visual-refresh/task-motion-rework-unpin-scenes-restrained-reveals.md
  Leaves live only under a story. id is the filename stem: task-motion-rework-unpin-scenes-restrained-reveals.
  CLI `arggon create task motion-rework-unpin-scenes-restrained-reveals` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Motion rework: unpin scenes, restrained reveals

## Context

The scroll animations felt stuck: every chapter was a 165-190vh sticky pin range, so
the wheel kept scrolling while the content stayed put. On top of that, chapter-focus
dimming, velocity skew/parallax on the stage diagrams, 3D card tilt, magnetic links,
a JS anchor glide and a 26 s infinite ambient drift all competed with native scroll.

## Acceptance

- [x] Scenes are normal-flow sections (no sticky pin); native scroll always moves content
- [x] Scene renderers driven by viewProgress (section travelling through the viewport), unit-tested
- [x] Reveals are opacity + <=12px translate, 320-360 ms, <=240 ms stagger; content never dimmed once revealed
- [x] Velocity skew, parallax, 3D tilt, magnetic links, JS anchor glide and infinite ambient drift removed
- [x] prefers-reduced-motion: no transitions, everything fully visible (checked: opacity 1)
- [x] EN and ES verified (screenshots), all node tests green
- [x] Lighthouse before/after recorded in the PR (perf 98 -> 98, TBT 30 ms -> 0 ms, CLS 0)

## Notes

- Done evidence (2026-10-14): PR #26 merged by Gonzalo into main as 49c34eb (https://github.com/Arggon/arggon-cv/pull/26); acceptance checklist all ticked; node tests and arggon validate green at merge.
