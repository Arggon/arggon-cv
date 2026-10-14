---
type: task
status: done
id: task-update-cv-pdf-new-headline-and-summary
title: "Update CV PDF: new headline and summary"
assignee: Arggon
parent: story-deploy
labels: []
created: "2026-10-14"
updated: "2026-10-14"
---
<!--
  Placement (v0): tasks/cv-online/ship/story-deploy/task-update-cv-pdf-new-headline-and-summary.md
  Leaves live only under a story. id is the filename stem: task-update-cv-pdf-new-headline-and-summary.
  CLI `arggon create task update-cv-pdf-new-headline-and-summary` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Update CV PDF: new headline and summary

## Context

Swap assets/Gonzalo-Arganaraz-CV.pdf for the revised CV (new headline and summary).

## Acceptance

- [x] assets/Gonzalo-Arganaraz-CV.pdf replaced
- [x] pdftotext check: no phone number, no +54

## Notes

- Done evidence (2026-10-14): PR #27 merged by Gonzalo into main as d76acbb (https://github.com/Arggon/arggon-cv/pull/27); acceptance checklist all ticked; node tests and arggon validate green at merge.
