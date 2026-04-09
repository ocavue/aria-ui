---
"@aria-ui/elements": patch
---

Listbox now clears the highlighted value when `autoHighlight` is toggled from `true` to `false`. This makes `autoHighlight` usable as an active gate (e.g. by hidden popups) without leaving stale `aria-activedescendant` and `data-highlighted` state behind.
