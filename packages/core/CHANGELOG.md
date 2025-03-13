# @aria-ui/core

## 0.0.21

### Patch Changes

- 4b43df9: Update dependencies.

## 0.0.20

### Patch Changes

- 27704ee: Update dependencies.

## 0.0.19

### Patch Changes

- 9953a23: Add the ability to set and reflect attribute values.
- 3d8c36d: Add event emitters.
- e595094: Remove `adoptedCallback` method from `BaseElement`.

## 0.0.18

### Patch Changes

- 5356852: Export type `EmptyObject`.

## 0.0.17

### Patch Changes

- b8160e8: Fix an issue where the context subscription is not built correctly if the consumer value is retrieved before the element is connected to the DOM.

## 0.0.16

### Patch Changes

- e00f767: Simplify element creation by using `ElementBuilder`.

## 0.0.15

### Patch Changes

- eec595a: Signals now use `.get()` and `.set()` instead of `.value`.

  This matches the design of the stage-1 JavaScript Signals standard proposal.

## 0.0.14

### Patch Changes

- f58eba1: Add a third parameter to `useQuerySelectorAll` and `useQuerySelector` to allow the user to specify mutation observer options.

## 0.0.13

### Patch Changes

- 0235e12: Add `ElementMixin` as an easier method to define a custom element.

## 0.0.12

### Patch Changes

- 8ea9a91: Fix a bug where `useQuerySelectorAll` and `useQuerySelector` won't get triggered when children changed.

## 0.0.11

### Patch Changes

- 566b55c: Correct a typo.

## 0.0.10

### Patch Changes

- e6428d8: Add `useAnimationFrame`.

## 0.0.9

### Patch Changes

- 21c7a2e: `useAriaRole` now accepts a string role value. `setAriaRole` is removed in favor of `useAriaRole`.

## 0.0.8

### Patch Changes

- b18a983: Add `useQuerySelector` and `useQuerySelectorAll`.
- b18a983: Add `setAriaRole`.

## 0.0.7

### Patch Changes

- d5a98e5: Reduce npm package size by removing unnecessary files from the package.

## 0.0.6

### Patch Changes

- d4e70a4: The default value for a context needs to be assigned when creating the context.

## 0.0.5

### Patch Changes

- 3db19be: Only consume the context when the element is connected.

## 0.0.4

### Patch Changes

- 014d561: Publish `@aria-ui/core`.
