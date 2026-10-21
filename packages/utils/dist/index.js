import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.js";
import { getNearestOverflowAncestor } from "@zag-js/dom-query";
import { computed, createSignal, onMount, useEffect } from "@aria-ui/core";
//#region src/aria.ts
function useAriaDisabled(host, getAriaDisabled) {
	return useEffect(host, () => {
		host.ariaDisabled = getAriaDisabled() ? "true" : null;
	});
}
function useAriaExpanded(host, getAriaExpanded) {
	return useEffect(host, () => {
		const ariaExpanded = getAriaExpanded();
		host.ariaExpanded = ariaExpanded === true ? "true" : ariaExpanded === false ? "false" : null;
	});
}
function useAriaControls(host, getAriaControls) {
	return useEffect(host, () => {
		const ariaControls = getAriaControls();
		if (ariaControls) host.setAttribute("aria-controls", ariaControls);
		else host.removeAttribute("aria-controls");
	});
}
function useAriaDescribedBy(host, getAriaDescribedBy) {
	return useEffect(host, () => {
		const ariaDescribedBy = getAriaDescribedBy();
		if (ariaDescribedBy) host.setAttribute("aria-describedby", ariaDescribedBy);
		else host.removeAttribute("aria-describedby");
	});
}
function useAriaMultiselectable(host, getMultiselectable) {
	return useEffect(host, () => {
		host.ariaMultiSelectable = getMultiselectable() ? "true" : null;
	});
}
function useAriaOrientation(host, getOrientation) {
	return useEffect(host, () => {
		host.setAttribute("aria-orientation", getOrientation());
	});
}
function useAriaActivedescendant(host, getActivedescendant) {
	return useEffect(host, () => {
		const id = getActivedescendant();
		if (id) host.setAttribute("aria-activedescendant", id);
		else host.removeAttribute("aria-activedescendant");
	});
}
function useAriaSelected(host, getSelected) {
	return useEffect(host, () => {
		host.ariaSelected = String(getSelected());
	});
}
function useAriaHasPopup(host, getHasPopup) {
	return useEffect(host, () => {
		setAriaHasPopup(host, getHasPopup());
	});
}
function getAriaHasPopup(element) {
	return element.getAttribute("aria-haspopup");
}
function setAriaHasPopup(element, value) {
	if (value) element.setAttribute("aria-haspopup", value);
	else element.removeAttribute("aria-haspopup");
}
//#endregion
//#region src/apply-styles-without-transition.ts
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
function applyStylesWithoutTransition(element, applyStyles) {
	const inlineTransition = element.style.transition;
	element.style.transition = "none";
	applyStyles();
	element.offsetWidth;
	element.style.transition = inlineTransition;
}
//#endregion
//#region src/collection.ts
/**
* Get the value of an HTMLElement.
*
* @internal
*/
function getCollectionItemValue(element) {
	return element.value || element.textContent?.trim() || element.innerText?.trim() || "";
}
function isDisabled(element) {
	return element.disabled || element.getAttribute("aria-disabled") === "true" || element.getAttribute("aria-hidden") === "true";
}
/**
* An ordered collection of items with O(1) lookup and directional traversal.
* Skips disabled items automatically.
*/
var Collection = class {
	constructor(items, loop = true) {
		this.loop = loop;
		this._items = [];
		this._indexes = /* @__PURE__ */ new Map();
		for (const item of items) {
			const value = getCollectionItemValue(item);
			if (!value || this._indexes.has(value)) continue;
			this._indexes.set(value, this._items.length);
			this._items.push(item);
		}
	}
	size() {
		return this._items.length;
	}
	_find(startIndex, dir) {
		let index = startIndex;
		const n = this._items.length;
		for (let i = 0; i < n; i++) {
			if (index < 0 || index >= n) {
				if (this.loop) index = (index + n) % n;
				else break;
			}
			const item = this._items[index];
			if (item && !isDisabled(item)) return getCollectionItemValue(item);
			index += dir;
		}
	}
	first() {
		return this._find(0, 1);
	}
	last() {
		return this._find(this.size() - 1, -1);
	}
	next(value) {
		if (value === void 0) return this.first();
		const index = this._indexes.get(value);
		if (index === void 0) return this.first();
		return this._find(index + 1, 1);
	}
	prev(value) {
		if (value === void 0) return this.last();
		const index = this._indexes.get(value);
		if (index === void 0) return this.last();
		return this._find(index - 1, -1);
	}
	getElement(value) {
		const index = this._indexes.get(value);
		if (index === void 0) return void 0;
		return this._items[index];
	}
	getValues() {
		return this._items.map(getCollectionItemValue);
	}
};
//#endregion
//#region src/use-attribute.ts
/**
* Sets the computed attribute of the element when it's connected.
*
* @internal
*/
function useAttribute(element, key, compute) {
	return useEffect(element, () => {
		const value = compute();
		if (value == null) element.removeAttribute(key);
		else element.setAttribute(key, String(value));
	});
}
//#endregion
//#region src/use-event-listener.ts
function useEventListener(host, type, listener, options) {
	return onMount(host, () => {
		host.addEventListener(type, listener, options);
		return () => {
			host.removeEventListener(type, listener, options);
		};
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@ocavue+utils@1.7.0/node_modules/@ocavue/utils/dist/index.js
/**
* A map that counts occurrences of keys.
*
* @example
* ```typescript
* // Count word occurrences
* const wordCounter = new Counter<string>()
* const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
*
* for (const word of words) {
*   wordCounter.increment(word)
* }
*
* console.log(wordCounter.get('apple'))   // 3
* console.log(wordCounter.get('banana'))  // 2
* console.log(wordCounter.get('cherry'))  // 1
* console.log(wordCounter.get('orange'))  // 0 (defaults to 0)
* ```
*
* @example
* ```typescript
* // Initialize with existing counts
* const counter = new Counter<string>([
*   ['red', 5],
*   ['blue', 3],
*   ['green', 7]
* ])
*
* counter.increment('red', 2)      // red: 5 -> 7
* counter.decrement('blue')        // blue: 3 -> 2
* counter.increment('yellow')      // yellow: 0 -> 1
*
* console.log(counter.get('red'))    // 7
* console.log(counter.get('blue'))   // 2
* console.log(counter.get('yellow')) // 1
* ```
*
* @example
* ```typescript
* // Track event frequencies
* const eventCounter = new Counter<string>()
*
* eventCounter.increment('click', 5)
* eventCounter.increment('hover', 3)
* eventCounter.increment('click', 2)
*
* // Get most common events
* const events = [...eventCounter.entries()]
*   .sort((a, b) => b[1] - a[1])
*
* console.log(events) // [['click', 7], ['hover', 3]]
* ```
*/
var Counter = class extends Map {
	constructor(iterable) {
		super(iterable);
	}
	get(key) {
		return super.get(key) ?? 0;
	}
	/**
	* Increments the count for a key by a given amount (default 1).
	*/
	increment(key, amount = 1) {
		this.set(key, this.get(key) + amount);
	}
	/**
	* Decrements the count for a key by a given amount (default 1).
	*/
	decrement(key, amount = 1) {
		this.set(key, this.get(key) - amount);
	}
};
var DefaultMap = class extends Map {
	constructor(defaultFactory, iterable) {
		super(iterable), this.defaultFactory = defaultFactory;
	}
	get(key) {
		if (this.has(key)) return super.get(key);
		let value = this.defaultFactory();
		return this.set(key, value), value;
	}
};
let id = 0;
let maxSafeInteger = 2 ** 53 - 1;
/**
* Generates a unique positive integer.
*/
function getId() {
	return id++, id >= maxSafeInteger && (id = 1), id;
}
//#endregion
//#region src/use-global-event-listener.ts
const eventListenerMap = /* @__PURE__ */ new DefaultMap(() => new Counter());
const abortControllerMap = /* @__PURE__ */ new Map();
function addEventListener(type) {
	cleanEventListener(type);
	const abortController = new AbortController();
	abortControllerMap.set(type, abortController);
	window.addEventListener(type, (event) => {
		const listeners = eventListenerMap.get(type);
		for (const listener of listeners.keys()) listener(event);
	}, {
		capture: true,
		passive: true,
		signal: abortController.signal
	});
}
function cleanEventListener(type) {
	const controller = abortControllerMap.get(type);
	if (controller) {
		controller.abort();
		abortControllerMap.delete(type);
	}
}
function useGlobalEventListener(host, type, listener) {
	const eventListener = listener;
	return onMount(host, () => {
		const listeners = eventListenerMap.get(type);
		if (listeners.size === 0) addEventListener(type);
		listeners.increment(eventListener);
		return () => {
			if (listeners.get(eventListener) <= 1) listeners.delete(eventListener);
			else listeners.decrement(eventListener);
			if (listeners.size === 0) cleanEventListener(type);
		};
	});
}
//#endregion
//#region src/use-is-mouse-active.ts
/**
* Returns a function that tracks whether the mouse is currently active (i.e. the user has recently moved the mouse or clicked).
*
* This is useful for components that want to ignore mouse hover styles when the user is using keyboard navigation.
*/
function useIsMouseActive(host) {
	const { get: getIsMouseActive, set: setIsMouseActive } = createSignal(false);
	const handleMouseAction = () => setIsMouseActive(true);
	const handleKeyboardAction = () => setIsMouseActive(false);
	useGlobalEventListener(host, "mousemove", handleMouseAction);
	useGlobalEventListener(host, "mousedown", handleMouseAction);
	useGlobalEventListener(host, "keydown", handleKeyboardAction);
	return getIsMouseActive;
}
//#endregion
//#region src/collection-item.ts
/**
* Shared setup logic for collection items (listbox options, menu items, etc.).
*
* Handles: value derivation, aria-disabled, data-highlighted,
* item registration on mount/unmount, and mouseenter highlighting.
*
* @internal
*/
function setupCollectionItem(host, props, getStore, shouldRegisterItem) {
	const { value: { get: getValue, set: setValue }, disabled: { get: getDisabled } } = props;
	useEffect(host, () => {
		if (getValue()) return;
		const itemValue = getCollectionItemValue(host);
		if (itemValue) setValue(itemValue);
	});
	useAriaDisabled(host, getDisabled);
	const getIsHighlighted = computed(() => {
		const store = getStore();
		if (!store) return false;
		return store.getHighlightedValue() === getValue();
	});
	useAttribute(host, "data-highlighted", () => getIsHighlighted() ? "" : void 0);
	useEffect(host, () => {
		const store = getStore();
		if (!store) return;
		if (shouldRegisterItem && shouldRegisterItem(host) === false) return;
		store.registerItem(host);
		return () => store.unregisterItem(host);
	});
	useEffect(host, () => {
		getValue();
		getStore()?.markDirty();
	});
	const getIsMouseActive = useIsMouseActive(host);
	const handleMouseAction = () => {
		const store = getStore();
		if (!store) return;
		if (getDisabled()) return;
		if (!getIsMouseActive()) return;
		store.setHighlightedValue(getValue());
	};
	useEventListener(host, "mouseenter", handleMouseAction);
	useEventListener(host, "mousedown", handleMouseAction);
}
//#endregion
//#region src/collection-navigation.ts
/**
* @internal
*/
function handleCollectionNavigation(event, collection, getHighlightedValue, setHighlightedValue, orientation = "vertical", stopPropagation = false) {
	if (collection.size() === 0) return false;
	const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
	const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
	let nextValue;
	switch (event.key) {
		case nextKey:
			nextValue = collection.next(getHighlightedValue());
			break;
		case prevKey:
			nextValue = collection.prev(getHighlightedValue());
			break;
		case "Home":
			nextValue = collection.first();
			break;
		case "End":
			nextValue = collection.last();
			break;
		default: return false;
	}
	event.preventDefault();
	if (stopPropagation) event.stopPropagation();
	if (nextValue != null) setHighlightedValue(nextValue);
	return true;
}
//#endregion
//#region src/sort-elements.ts
function sortElements(elements) {
	return [...elements].sort((a, b) => {
		const pos = a.compareDocumentPosition(b);
		if (pos & 4) return -1;
		if (pos & 2) return 1;
		return 0;
	});
}
//#endregion
//#region src/collection-store.ts
/**
* @internal
*/
function createCollectionStore() {
	const highlightedValue = createSignal(void 0);
	const version = createSignal(getId());
	const items = /* @__PURE__ */ new Set();
	let dirty = true;
	let cached = new Collection([]);
	let pendingNotify = false;
	const notify = () => {
		dirty = true;
		if (!pendingNotify) {
			pendingNotify = true;
			queueMicrotask(() => {
				pendingNotify = false;
				version.set(getId());
			});
		}
	};
	const getCollection = () => {
		version.get();
		if (dirty) {
			dirty = false;
			cached = new Collection(sortElements(items));
		}
		return cached;
	};
	return {
		getHighlightedValue: highlightedValue.get,
		setHighlightedValue: highlightedValue.set,
		getCollection,
		registerItem: (element) => {
			if (items.has(element)) return;
			items.add(element);
			notify();
		},
		unregisterItem: (element) => {
			if (!items.has(element)) return;
			items.delete(element);
			notify();
		},
		markDirty: notify
	};
}
//#endregion
//#region src/delayed-toggle.ts
/**
* @internal
*/
function createDelayedToggle(onOpen, onClose) {
	let openTimeout;
	let closeTimeout;
	function cancelOpen() {
		if (openTimeout !== void 0) {
			clearTimeout(openTimeout);
			openTimeout = void 0;
		}
	}
	function cancelClose() {
		if (closeTimeout !== void 0) {
			clearTimeout(closeTimeout);
			closeTimeout = void 0;
		}
	}
	return {
		open(delay) {
			cancelClose();
			if (delay > 0) openTimeout = setTimeout(() => {
				openTimeout = void 0;
				onOpen?.();
			}, delay);
			else onOpen?.();
		},
		close(delay) {
			cancelOpen();
			if (delay > 0) closeTimeout = setTimeout(() => {
				closeTimeout = void 0;
				onClose?.();
			}, delay);
			else onClose?.();
		},
		dispose() {
			cancelOpen();
			cancelClose();
		}
	};
}
//#endregion
//#region src/feature-detection/popover.ts
var popover_exports = /* @__PURE__ */ __exportAll({
	detect: () => detect,
	get: () => get,
	override: () => override,
	reset: () => reset
});
let result;
/**
* Whether Popover API is supported.
* @internal
*/
function get() {
	if (result == null) result = detect();
	return result;
}
/**
* @internal
*/
function detect() {
	try {
		if (typeof window === "undefined" || typeof HTMLElement === "undefined") return false;
		return Object.hasOwn(HTMLElement.prototype, "popover");
	} catch {
		return false;
	}
}
/**
* Only used for testing.
* @internal
*/
function override(support) {
	result = support;
}
function reset() {
	result = void 0;
}
//#endregion
//#region src/feature-detection/feature-detection-internals.ts
var feature_detection_internals_exports = /* @__PURE__ */ __exportAll({ Popover: () => popover_exports });
//#endregion
//#region src/feature-detection/feature-detection.ts
var feature_detection_exports = /* @__PURE__ */ __exportAll({ supportsPopover: () => get });
//#endregion
//#region src/use-data-state.ts
function useDataState(host, getOpen) {
	const getDataState = computed(() => getOpen() ? "open" : "closed");
	useEffect(host, () => {
		host.dataset.state = getDataState();
	});
}
//#endregion
//#region src/use-disabled-mount-transition-style.ts
/** @internal */
function useDisabledMountTransitionStyle(host, getTransitionStatus) {
	let currentValue = "";
	const update = (newValue) => {
		if (currentValue !== newValue) {
			currentValue = newValue;
			host.style.transition = newValue;
		}
	};
	useEffect(host, () => {
		if (getTransitionStatus() === "entering") update("none");
		else update("");
	});
}
//#endregion
//#region src/use-element-id.ts
/**
* Generates a unique id for an element if it doesn't already have one. Returns the existing id if it has one.
*/
function useElementId(element) {
	const existingId = element.id;
	if (existingId) return existingId;
	const newId = `aria-ui-id-${getId()}`;
	onMount(element, () => {
		element.id = newId;
	});
	return newId;
}
//#endregion
//#region src/is-element-hidden.ts
/**
* Whether the element is not rendered, e.g. it or one of its ancestors has
* `display: none`. Such an element has no box, so `getBoundingClientRect()`
* returns a zero rect at the viewport origin. Falls back to `false` in
* browsers without `checkVisibility` support.
*/
function isElementHidden(element) {
	if (!element) return false;
	if (element.checkVisibility?.() !== false) return false;
	if (getComputedStyle(element).display === "contents") {
		const parent = element.parentElement;
		return parent ? isElementHidden(parent) : false;
	}
	return true;
}
//#endregion
//#region src/use-hover.ts
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
function useHover(target, options) {
	const { openDelay = 0, closeDelay = 0, onOpen, onClose } = options;
	let openTimeout;
	let closeTimeout;
	const handleMouseEnter = () => {
		if (closeTimeout !== void 0) {
			clearTimeout(closeTimeout);
			closeTimeout = void 0;
		}
		if (onOpen) {
			if (openDelay > 0) openTimeout = window.setTimeout(onOpen, openDelay);
			else onOpen();
		}
	};
	const handleMouseLeave = () => {
		if (openTimeout !== void 0) {
			clearTimeout(openTimeout);
			openTimeout = void 0;
		}
		if (onClose) {
			if (closeDelay > 0) closeTimeout = window.setTimeout(onClose, closeDelay);
			else onClose();
		}
	};
	target.addEventListener("mouseenter", handleMouseEnter);
	target.addEventListener("mouseleave", handleMouseLeave);
	return () => {
		target.removeEventListener("mouseenter", handleMouseEnter);
		target.removeEventListener("mouseleave", handleMouseLeave);
		if (openTimeout !== void 0) clearTimeout(openTimeout);
		if (closeTimeout !== void 0) clearTimeout(closeTimeout);
	};
}
//#endregion
//#region src/use-presence.ts
/**
* Manages element visibility with CSS animation awareness.
*
* When `open` becomes `true`, the element is shown immediately. When `open`
* becomes `false`, the element is hidden after any running CSS animations
* complete, enabling exit animations.
*
* @internal
*/
function usePresence(host, getOpen) {
	const visible = createSignal(getOpen());
	useEffect(host, () => {
		if (visible.get()) show(host);
		else hide(host);
	});
	useEffect(host, () => {
		if (getOpen()) {
			visible.set(true);
			return;
		}
		const animations = host.getAnimations();
		if (animations.length === 0) {
			visible.set(false);
			return;
		}
		let canceled = false;
		Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
			if (!canceled) visible.set(false);
		});
		return () => {
			canceled = true;
		};
	});
	return visible.get;
}
function show(element) {
	if (element.style.display === "none") element.style.display = "";
}
function hide(element) {
	element.style.display = "none";
}
//#endregion
//#region src/use-press.ts
function usePress(host, handler) {
	const disposeClick = useEventListener(host, "click", handler);
	const disposeKeyDown = useEventListener(host, "keydown", (event) => {
		if (event.isComposing) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handler();
		}
	});
	return () => {
		disposeClick();
		disposeKeyDown();
	};
}
//#endregion
//#region src/use-transition-status.ts
/** @internal */
function useTransitionStatus(host, getOpen) {
	const status = createSignal("exited");
	let mounted = false;
	useEffect(host, () => {
		if (getOpen()) {
			status.set("entering");
			mounted = true;
			const id = requestAnimationFrame(() => {
				status.set("entered");
			});
			return () => cancelAnimationFrame(id);
		} else if (mounted) {
			status.set("exiting");
			const id = requestAnimationFrame(() => {
				status.set("exited");
			});
			return () => cancelAnimationFrame(id);
		}
	});
	return status.get;
}
//#endregion
export { Collection, feature_detection_exports as FeatureDetection, feature_detection_internals_exports as FeatureDetectionInternals, applyStylesWithoutTransition, createCollectionStore, createDelayedToggle, getAriaHasPopup, getCollectionItemValue, getNearestOverflowAncestor, handleCollectionNavigation, isElementHidden, setAriaHasPopup, setupCollectionItem, useAriaActivedescendant, useAriaControls, useAriaDescribedBy, useAriaDisabled, useAriaExpanded, useAriaHasPopup, useAriaMultiselectable, useAriaOrientation, useAriaSelected, useAttribute, useDataState, useDisabledMountTransitionStyle, useElementId, useEventListener, useGlobalEventListener, useHover, useIsMouseActive, usePresence, usePress, useTransitionStatus };

//# sourceMappingURL=index.js.map