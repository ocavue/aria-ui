# @aria-ui/cli

## 0.1.5

### Patch Changes

- f890202: Fix parsing of directly declared exports in entry files. Previously, only re-exports (`export { X } from '...'`) were recognized. Now directly declared exports (`export interface X {}`, `export function X() {}`) are also handled correctly.

## 0.1.4

### Patch Changes

- b89af29: Simplify auto-generated file comments.

## 0.1.3

### Patch Changes

- 9cee049: Improve fs performance.

## 0.1.2

### Patch Changes

- b87f7a1: Remove event re-export.

## 0.1.1

### Patch Changes

- f300444: Improve generated code.

## 0.1.0

### Minor Changes

- e4e973f: Release v0.1.0.
