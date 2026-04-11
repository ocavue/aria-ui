---
"@aria-ui/cli": patch
---

Fix parsing of directly declared exports in entry files. Previously, only re-exports (`export { X } from '...'`) were recognized. Now directly declared exports (`export interface X {}`, `export function X() {}`) are also handled correctly.
