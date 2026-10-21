import { getNearestOverflowAncestor } from "@zag-js/dom-query";
import { HostElement, State } from "@aria-ui/core";
//#region src/aria.d.ts
declare function useAriaDisabled(host: HostElement, getAriaDisabled: () => boolean): VoidFunction;
declare function useAriaExpanded(host: HostElement, getAriaExpanded: () => boolean | undefined): VoidFunction;
declare function useAriaControls(host: HostElement, getAriaControls: () => string | undefined): VoidFunction;
declare function useAriaDescribedBy(host: HostElement, getAriaDescribedBy: () => string | undefined): VoidFunction;
declare function useAriaMultiselectable(host: HostElement, getMultiselectable: () => boolean): VoidFunction;
declare function useAriaOrientation(host: HostElement, getOrientation: () => string): VoidFunction;
declare function useAriaActivedescendant(host: HostElement, getActivedescendant: () => string | undefined): VoidFunction;
declare function useAriaSelected(host: HostElement, getSelected: () => boolean): VoidFunction;
type AriaHasPopup = 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'true' | 'false';
declare function useAriaHasPopup(host: HostElement, getHasPopup: () => AriaHasPopup | undefined | null): VoidFunction;
declare function getAriaHasPopup(element: Element): AriaHasPopup | undefined | null;
declare function setAriaHasPopup(element: Element, value: AriaHasPopup | undefined | null): void;
//#endregion
//#region src/apply-styles-without-transition.d.ts
/**
 * Applies style changes with CSS transitions disabled, so that the element
 * jumps to its new styles instead of animating from the old ones.
 *
 * Reading `offsetWidth` in between forces a synchronous style flush, the same
 * force-reflow trick used by Bootstrap's `reflow()`, MUI's `reflow()`, Vue's
 * `forceReflow()`, and react-transition-group's `forceReflow()`. Without it,
 * the browser would coalesce the writes and the restored transition would
 * animate them.
 */
declare function applyStylesWithoutTransition(element: HTMLElement, applyStyles: VoidFunction): void;
//#endregion
//#region src/collection.d.ts
/**
 * Get the value of an HTMLElement.
 *
 * @internal
 */
declare function getCollectionItemValue(element: HTMLElement): string;
/**
 * An ordered collection of items with O(1) lookup and directional traversal.
 * Skips disabled items automatically.
 */
declare class Collection {
  readonly loop: boolean;
  private _items;
  private _indexes;
  constructor(items: Iterable<HTMLElement>, loop?: boolean);
  size(): number;
  private _find;
  first(): string | undefined;
  last(): string | undefined;
  next(value: string | undefined): string | undefined;
  prev(value: string | undefined): string | undefined;
  getElement(value: string): HTMLElement | undefined;
  getValues(): string[];
}
//#endregion
//#region src/collection-store.d.ts
/**
 * @internal
 */
interface CollectionStore {
  getHighlightedValue: () => string | undefined;
  setHighlightedValue: (value: string | undefined) => void;
  getCollection: () => Collection;
  registerItem: (element: HTMLElement) => void;
  unregisterItem: (element: HTMLElement) => void;
  markDirty: () => void;
}
/**
 * @internal
 */
declare function createCollectionStore(): CollectionStore;
//#endregion
//#region src/collection-item.d.ts
/**
 * Shared setup logic for collection items (listbox options, menu items, etc.).
 *
 * Handles: value derivation, aria-disabled, data-highlighted,
 * item registration on mount/unmount, and mouseenter highlighting.
 *
 * @internal
 */
declare function setupCollectionItem(host: HostElement, props: State<{
  value: string;
  disabled: boolean;
}>, getStore: () => CollectionStore | undefined, shouldRegisterItem?: (element: HTMLElement) => boolean): void;
//#endregion
//#region src/collection-navigation.d.ts
/**
 * @internal
 */
declare function handleCollectionNavigation(event: KeyboardEvent, collection: Collection, getHighlightedValue: () => string | undefined, setHighlightedValue: (value: string | undefined) => void, orientation?: 'vertical' | 'horizontal', stopPropagation?: boolean): boolean;
//#endregion
//#region src/delayed-toggle.d.ts
/**
 * @internal
 */
interface DelayedToggle {
  open(delay: number): void;
  close(delay: number): void;
  dispose(): void;
}
/**
 * @internal
 */
declare function createDelayedToggle(onOpen?: () => void, onClose?: () => void): DelayedToggle;
declare namespace popover_d_exports {
  export { detect, get, override, reset };
}
/**
 * Whether Popover API is supported.
 * @internal
 */
declare function get(): boolean;
/**
 * @internal
 */
declare function detect(): boolean;
/**
 * Only used for testing.
 * @internal
 */
declare function override(support: boolean): void;
declare function reset(): void;
declare namespace feature_detection_internals_d_exports {
  export { popover_d_exports as Popover };
}
declare namespace feature_detection_d_exports {
  export { get as supportsPopover };
}
//#endregion
//#region src/use-attribute.d.ts
/**
 * Sets the computed attribute of the element when it's connected.
 *
 * @internal
 */
declare function useAttribute(element: HostElement, key: string, compute: () => string | number | undefined | null): VoidFunction;
//#endregion
//#region src/use-data-state.d.ts
declare function useDataState(host: HostElement, getOpen: () => boolean): void;
//#endregion
//#region src/use-transition-status.d.ts
/** @internal */
type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
/** @internal */
declare function useTransitionStatus(host: HostElement, getOpen: () => boolean): () => TransitionStatus;
//#endregion
//#region src/use-disabled-mount-transition-style.d.ts
/** @internal */
declare function useDisabledMountTransitionStyle(host: HostElement, getTransitionStatus: () => TransitionStatus): void;
//#endregion
//#region src/use-element-id.d.ts
/**
 * Generates a unique id for an element if it doesn't already have one. Returns the existing id if it has one.
 */
declare function useElementId(element: HostElement): string;
//#endregion
//#region src/use-event-listener.d.ts
declare function useEventListener<K extends keyof HTMLElementEventMap>(host: HostElement, type: K, listener: (event: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): VoidFunction;
//#endregion
//#region src/use-global-event-listener.d.ts
declare function useGlobalEventListener<K extends keyof WindowEventMap>(host: HostElement, type: K, listener: (event: WindowEventMap[K]) => void): VoidFunction;
//#endregion
//#region src/is-element-hidden.d.ts
/**
 * Whether the element is not rendered, e.g. it or one of its ancestors has
 * `display: none`. Such an element has no box, so `getBoundingClientRect()`
 * returns a zero rect at the viewport origin. Falls back to `false` in
 * browsers without `checkVisibility` support.
 */
declare function isElementHidden(element: Element | undefined): boolean;
//#endregion
//#region src/use-hover.d.ts
/**
 * Options for the useHover hook
 */
interface UseHoverOptions {
  /**
   * Delay in milliseconds before calling onOpen when hovering starts.
   * If set to 0, onOpen is called immediately without setTimeout.
   *
   * @default 0
   */
  openDelay?: number;
  /**
   * Delay in milliseconds before calling onClose when hovering ends.
   * If set to 0, onClose is called immediately without setTimeout.
   *
   * @default 0
   */
  closeDelay?: number;
  /**
   * Callback function called when hovering starts (after openDelay).
   */
  onOpen?: () => void;
  /**
   * Callback function called when hovering ends (after closeDelay).
   */
  onClose?: () => void;
}
/**
 * Attaches hover event listeners to a target element with configurable delays.
 *
 * @param target - The HTML element to attach hover listeners to
 * @param options - Configuration options for hover behavior
 * @returns A cleanup function that removes event listeners and clears pending timeouts
 *
 * @example
 * ```typescript
 * const cleanup = useHover(element, {
 *   openDelay: 300,
 *   closeDelay: 0,
 *   onOpen: () => console.log('Hover started'),
 *   onClose: () => console.log('Hover ended'),
 * })
 *
 * // Later, when you need to cleanup:
 * cleanup()
 * ```
 */
declare function useHover(target: HTMLElement, options: UseHoverOptions): VoidFunction;
//#endregion
//#region src/use-is-mouse-active.d.ts
/**
 * Returns a function that tracks whether the mouse is currently active (i.e. the user has recently moved the mouse or clicked).
 *
 * This is useful for components that want to ignore mouse hover styles when the user is using keyboard navigation.
 */
declare function useIsMouseActive(host: HostElement): () => boolean;
//#endregion
//#region src/use-presence.d.ts
/**
 * Manages element visibility with CSS animation awareness.
 *
 * When `open` becomes `true`, the element is shown immediately. When `open`
 * becomes `false`, the element is hidden after any running CSS animations
 * complete, enabling exit animations.
 *
 * @internal
 */
declare function usePresence(host: HostElement, getOpen: () => boolean): () => boolean;
//#endregion
//#region src/use-press.d.ts
declare function usePress(host: HostElement, handler: () => void): VoidFunction;
//#endregion
export { Collection, type CollectionStore, type DelayedToggle, feature_detection_d_exports as FeatureDetection, feature_detection_internals_d_exports as FeatureDetectionInternals, type TransitionStatus, type UseHoverOptions, applyStylesWithoutTransition, createCollectionStore, createDelayedToggle, getAriaHasPopup, getCollectionItemValue, getNearestOverflowAncestor, handleCollectionNavigation, isElementHidden, setAriaHasPopup, setupCollectionItem, useAriaActivedescendant, useAriaControls, useAriaDescribedBy, useAriaDisabled, useAriaExpanded, useAriaHasPopup, useAriaMultiselectable, useAriaOrientation, useAriaSelected, useAttribute, useDataState, useDisabledMountTransitionStyle, useElementId, useEventListener, useGlobalEventListener, useHover, useIsMouseActive, usePresence, usePress, useTransitionStatus };
//# sourceMappingURL=index.d.ts.map