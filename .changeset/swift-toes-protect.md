---
"@aria-ui/core": patch
---

Signals now use `.get()` and `.set()` instead of `.value`.

This matches the design of the stage-1 JavaScript Signals standard proposal.
