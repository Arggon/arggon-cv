---
type: task
status: done
id: task-i18n-toggle
title: Bilingual EN/ES toggle with persisted preference
assignee: arggon
branch: feat/task-i18n-toggle
parent: visual-refresh
labels: []
created: "2026-09-13"
updated: "2026-09-13"
worktree_path: /home/arggon/Projects/arggon-cv-task-i18n-toggle
---
<!--
  Placement (v0): tasks/cv-online/build/visual-refresh/task-i18n-toggle.md
  Leaves live only under a story. id is the filename stem: task-i18n-toggle.
  CLI `arggon create task i18n-toggle` adds the task- prefix (do not pass it twice).
  parent MUST be the story id. Omit assignee when unassigned. Omit blocked_reason unless status is blocked.
-->

# Bilingual EN/ES toggle with persisted preference

## Context

Add an EN/ES switch in the header. All user-facing copy (chapters, rail labels,
scene stage strings, footer, document title/meta description) exists in both
languages; toggle swaps textContent, updates html lang and og:locale, persists
the choice in localStorage, defaults to EN. Extract copy into js/i18n.js.

## Acceptance

- [ ] Toggle EN/ES switches every visible string including scene-stage animations
- [ ] Preference persisted; html[lang] and og:locale updated on switch
- [ ] Tests cover the i18n dictionary completeness (every key in both langs)
