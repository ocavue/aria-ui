import { computed, createSignal, defineProps, onMount, useEffect } from "@aria-ui/core";
import { FeatureDetection, applyStylesWithoutTransition, isElementHidden, useAriaDisabled, useDataState, useDisabledMountTransitionStyle, useElementId, usePresence, useTransitionStatus } from "@aria-ui/utils";
import { autoUpdate, computePosition, flip, hide, inline, offset, shift, size } from "@floating-ui/dom";
//#region src/overlay/open-change-event.ts
var OpenChangeEvent = class extends Event {
	constructor(open) {
		super("openChange");
		this.detail = open;
	}
};
//#endregion
//#region src/overlay/overlay-popup.ts
/**
* @internal
*/
const OverlayPopupPropsDeclaration = /* @__PURE__ */ defineProps({});
/**
* @internal
*/
function setupOverlayPopup(host, getOverlayStore) {
	const id = useElementId(host);
	useEffect(host, () => {
		const store = getOverlayStore();
		if (!store) return;
		store.setPopupId(id);
	});
	const getIsOpen = () => getOverlayStore()?.getIsOpen() ?? false;
	const getIsHidden = () => getOverlayStore()?.getIsHidden() ?? false;
	const getIsVisible = computed(() => getIsOpen() && !getIsHidden());
	useDataState(host, getIsVisible);
	usePresence(host, getIsVisible);
}
//#endregion
//#region ../../node_modules/.pnpm/@ocavue+utils@1.7.0/node_modules/@ocavue/utils/dist/index.js
/**
* Checks if the given value is an object.
*/
function isObject(value) {
	return typeof value == "object" && !!value;
}
/**
* Checks if the given DOM node is an Element.
*/
function isElement(node) {
	return node.nodeType === 1;
}
/**
* Checks if the given DOM node is a Document.
*/
function isDocument(node) {
	return node.nodeType === 9;
}
/**
* Checks if the given DOM node is a DocumentFragment.
*/
function isDocumentFragment(node) {
	return node.nodeType === 11;
}
/**
* Checks if the given DOM node is a ShadowRoot.
*/
function isShadowRoot(node) {
	return isDocumentFragment(node) && "host" in node && isElementLike(node.host);
}
/**
* Checks if an unknown value is likely a DOM element.
*/
function isElementLike(value) {
	return isObject(value) && value.nodeType === 1 && typeof value.nodeName == "string";
}
/**
* Gets the window object for the given target or the global window object if no
* target is provided.
*/
function getWindow(target) {
	if (target) {
		if (isShadowRoot(target)) return getWindow(target.host);
		if (isDocument(target)) return target.defaultView || window;
		if (isElement(target)) return target.ownerDocument?.defaultView || window;
	}
	return window;
}
//#endregion
//#region src/overlay/positioning.ts
/**
* @internal
*/
function updatePlacement(floating, reference, options) {
	const middleware = [
		setupOffset(options),
		setupFlip(options),
		setupShift(options),
		setupSize(options),
		setupInline(options),
		setupTransformOrigin(options),
		setupHide(options)
	];
	const { placement, strategy } = options;
	let canceled = false;
	let hoistApplied = false;
	let lastPosition;
	let topLeftSet = false;
	let lastTransform;
	let willChangeSet = false;
	let lastSide;
	let lastAlign;
	let firstUpdate = true;
	let skippedWhileHidden = false;
	const update = async () => {
		if (canceled) return;
		const referenceElement = unwrapElement(reference);
		if (referenceElement && !referenceElement.isConnected) return;
		if (options.hoist && FeatureDetection.supportsPopover() && !hoistApplied) {
			floating.style.margin = "unset";
			floating.setAttribute("popover", "manual");
			hoistApplied = true;
			floating.showPopover?.();
		}
		if (isReferenceHidden(reference) || isElementHidden(floating)) {
			skippedWhileHidden = true;
			return;
		}
		const pos = await computePosition(reference, floating, {
			placement,
			middleware,
			strategy
		});
		if (canceled) return;
		let isTempHidden = false;
		if (options.hide) {
			const hideData = pos.middlewareData.hide;
			isTempHidden = hideData?.escaped || hideData?.referenceHidden || false;
			options.setIsHidden(isTempHidden);
		}
		const dpr = getDPR(floating);
		const x = Math.round(pos.x * dpr) / dpr;
		const y = Math.round(pos.y * dpr) / dpr;
		if (!isTempHidden) {
			const applyStyles = () => {
				if (lastPosition !== pos.strategy) {
					floating.style.position = pos.strategy;
					lastPosition = pos.strategy;
				}
				if (!topLeftSet) {
					floating.style.top = "0px";
					floating.style.left = "0px";
					topLeftSet = true;
				}
				const transform = `translate(${x}px,${y}px)`;
				if (lastTransform !== transform) {
					floating.style.transform = transform;
					lastTransform = transform;
				}
				if (dpr >= 1.5 && !willChangeSet) {
					floating.style.willChange = "transform";
					willChangeSet = true;
				}
				const [side, align] = getSideAndAlignFromPlacement(pos.placement);
				if (lastSide !== side) {
					floating.setAttribute("data-side", side);
					lastSide = side;
				}
				if (lastAlign !== align) {
					floating.setAttribute("data-align", align);
					lastAlign = align;
				}
			};
			if (firstUpdate && options.disableFirstUpdateTransition || skippedWhileHidden) applyStylesWithoutTransition(floating, applyStyles);
			else applyStyles();
			firstUpdate = false;
			skippedWhileHidden = false;
		}
	};
	const autoUpdateOptions = typeof options.autoUpdate === "boolean" ? void 0 : options.autoUpdate;
	const cancelAutoUpdate = options.autoUpdate ? autoUpdate(reference, floating, update, autoUpdateOptions) : void 0;
	if (!options.autoUpdate) update();
	return () => {
		canceled = true;
		cancelAutoUpdate?.();
	};
}
function getOverflowOptions(props) {
	return {
		boundary: props.boundary,
		rootBoundary: props.rootBoundary,
		elementContext: props.elementContext,
		altBoundary: props.altBoundary,
		padding: props.overflowPadding
	};
}
function setupOffset(props) {
	if (props.offset == null) return;
	return offset(props.offset);
}
function setupFlip(props) {
	if (!props.flip) return;
	return flip({
		...getOverflowOptions(props),
		fallbackPlacements: props.flip === true ? void 0 : props.flip,
		crossAxis: false
	});
}
function setupShift(props) {
	if (!props.shift) return;
	return shift({
		...getOverflowOptions(props),
		mainAxis: props.shift,
		crossAxis: props.overlap
	});
}
function setupSize(props) {
	if (!props.fitViewport && !props.sameWidth && !props.sameHeight) return;
	let lastWidth;
	let lastHeight;
	let lastMaxWidth;
	let lastMaxHeight;
	return size({
		...getOverflowOptions(props),
		apply({ elements, rects, availableHeight, availableWidth }) {
			const floating = elements.floating;
			if (props.sameWidth) {
				const width = `${Math.round(rects.reference.width)}px`;
				if (lastWidth !== width) {
					floating.style.width = width;
					lastWidth = width;
				}
			}
			if (props.sameHeight) {
				const height = `${Math.round(rects.reference.height)}px`;
				if (lastHeight !== height) {
					floating.style.height = height;
					lastHeight = height;
				}
			}
			if (props.fitViewport) {
				const maxWidth = `${Math.floor(availableWidth)}px`;
				if (lastMaxWidth !== maxWidth) {
					floating.style.maxWidth = maxWidth;
					lastMaxWidth = maxWidth;
				}
				const maxHeight = `${Math.floor(availableHeight)}px`;
				if (lastMaxHeight !== maxHeight) {
					floating.style.maxHeight = maxHeight;
					lastMaxHeight = maxHeight;
				}
			}
		}
	});
}
function setupInline(props) {
	if (!props.inline) return;
	return inline();
}
function setupTransformOrigin(props) {
	let lastTransformOrigin;
	return {
		name: "transformOrigin",
		fn(state) {
			const { elements, middlewareData, placement: renderedPlacement, rects, x, y } = state;
			const [side] = getSideAndAlignFromPlacement(renderedPlacement);
			const refCenterX = rects.reference.x + rects.reference.width / 2 - x;
			const refCenterY = rects.reference.y + rects.reference.height / 2 - y;
			const transformX = Math.max(0, Math.min(refCenterX, rects.floating.width));
			const transformY = Math.max(0, Math.min(refCenterY, rects.floating.height));
			const offsetValue = getMainAxisOffset(props.offset);
			const isOverlapping = Math.abs(middlewareData.shift?.y || 0) > offsetValue;
			const sideAxis = side === "top" || side === "bottom" ? "y" : "x";
			let transformOrigin;
			if (props.overlap && sideAxis === "y" && isOverlapping) {
				const halfAnchorHeight = rects.reference.height / 2;
				transformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
			} else transformOrigin = {
				top: `${transformX}px calc(100% + ${offsetValue}px)`,
				bottom: `${transformX}px ${-offsetValue}px`,
				left: `calc(100% + ${offsetValue}px) ${transformY}px`,
				right: `${-offsetValue}px ${transformY}px`
			}[side];
			if (lastTransformOrigin !== transformOrigin) {
				elements.floating.style.setProperty("--transform-origin", transformOrigin);
				lastTransformOrigin = transformOrigin;
			}
			return {};
		}
	};
}
function getMainAxisOffset(offset) {
	if (typeof offset === "number") return offset;
	if (typeof offset === "object" && offset !== null) return offset.mainAxis ?? 0;
	return 0;
}
function setupHide(props) {
	if (!props.hide) return;
	return hide({
		padding: props.overflowPadding,
		elementContext: "reference"
	});
}
/**
* Whether the reference is not rendered. A real element is judged by
* {@link isElementHidden}. A virtual element is judged by its own
* `getBoundingClientRect()`: an all-zero rect is what a non-rendered anchor
* produces, while its `contextElement` can be misleading (e.g. a
* `display: contents` wrapper reports no box even though the anchor rect is
* valid).
*/
function isReferenceHidden(reference) {
	if (isElementLike(reference)) return isElementHidden(reference);
	const rect = reference.getBoundingClientRect();
	return rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0;
}
function getDPR(element) {
	return getWindow(element).devicePixelRatio || 1;
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
/**
* Unwraps a virtual element to its underlying DOM element.
*
* Copied from https://github.com/floating-ui/floating-ui/blob/b80ccaf9cfd7f80f28546906c60284c8385940f0/packages/dom/src/utils/unwrapElement.ts
*
* @internal
*/
function unwrapElement(element) {
	return !isElementLike(element) ? element.contextElement : element;
}
//#endregion
//#region src/overlay/overlay-positioner.ts
/**
* @internal
*/
const OverlayPositionerPropsDeclaration = /* @__PURE__ */ defineProps({
	strategy: {
		default: "absolute",
		attribute: "strategy",
		type: "string"
	},
	placement: {
		default: "top",
		attribute: "placement",
		type: "string"
	},
	autoUpdate: {
		default: true,
		attribute: false
	},
	hoist: {
		default: true,
		attribute: "hoist",
		type: "boolean"
	},
	offset: {
		default: 6,
		attribute: false
	},
	flip: {
		default: true,
		attribute: false
	},
	shift: {
		default: true,
		attribute: "shift",
		type: "boolean"
	},
	overlap: {
		default: false,
		attribute: "overlap",
		type: "boolean"
	},
	fitViewport: {
		default: false,
		attribute: "fit-viewport",
		type: "boolean"
	},
	sameWidth: {
		default: false,
		attribute: "same-width",
		type: "boolean"
	},
	sameHeight: {
		default: false,
		attribute: "same-height",
		type: "boolean"
	},
	inline: {
		default: false,
		attribute: "inline",
		type: "boolean"
	},
	hide: {
		default: false,
		attribute: "hide",
		type: "boolean"
	},
	boundary: {
		default: "clippingAncestors",
		attribute: false
	},
	rootBoundary: {
		default: "viewport",
		attribute: "root-boundary",
		type: "string"
	},
	overflowPadding: {
		default: 4,
		attribute: "overflow-padding",
		type: "number"
	},
	elementContext: {
		default: "floating",
		attribute: "element-context",
		type: "string"
	},
	altBoundary: {
		default: false,
		attribute: "alt-boundary",
		type: "boolean"
	}
});
/**
* @internal
*/
function setupOverlayPositioner(host, props, getStore) {
	const getIsOpen = computed(() => getStore()?.getIsOpen() ?? false);
	const getIsHidden = computed(() => getStore()?.getIsHidden() ?? false);
	const setIsHidden = (hidden) => getStore()?.setIsHidden(hidden);
	const getAnchorElement = computed(() => getStore()?.getAnchorElement());
	const getHoist = props.hoist.get;
	const getIsVisible = computed(() => getIsOpen() && !getIsHidden());
	const transitionStatus = useTransitionStatus(host, getIsVisible);
	useDisabledMountTransitionStyle(host, transitionStatus);
	useEffect(host, () => {
		const id = useElementId(host);
		getStore()?.setPositionerId(id);
	});
	let popoverDirty = false;
	if (FeatureDetection.supportsPopover()) useEffect(host, () => {
		if (getHoist()) {
			popoverDirty = true;
			host.popover = "manual";
			host.showPopover();
		} else if (popoverDirty) host.popover = null;
	});
	useDataState(host, getIsVisible);
	let wasOpen = false;
	useEffect(host, () => {
		const open = getIsOpen();
		const anchorElement = getAnchorElement();
		if (!open || !anchorElement) {
			wasOpen = false;
			return;
		}
		const disableFirstUpdateTransition = !wasOpen;
		wasOpen = true;
		return updatePlacement(host, anchorElement, {
			disableFirstUpdateTransition,
			strategy: props.strategy.get(),
			placement: props.placement.get(),
			autoUpdate: props.autoUpdate.get(),
			hoist: props.hoist.get(),
			offset: props.offset.get(),
			flip: props.flip.get(),
			shift: props.shift.get(),
			overlap: props.overlap.get(),
			fitViewport: props.fitViewport.get(),
			sameWidth: props.sameWidth.get(),
			sameHeight: props.sameHeight.get(),
			inline: props.inline.get(),
			hide: props.hide.get(),
			boundary: props.boundary.get(),
			rootBoundary: props.rootBoundary.get(),
			overflowPadding: props.overflowPadding.get(),
			elementContext: props.elementContext.get(),
			altBoundary: props.altBoundary.get(),
			setIsHidden
		});
	});
	onMount(host, () => {
		host.style.setProperty("background-color", "transparent");
	});
}
//#endregion
//#region src/overlay/overlay-store.ts
function createOverlayStore(getOpen, setOpen, getDefaultOpen, getDisabled, dispatchOpenChangeEvent) {
	const anchorElement = createSignal(void 0);
	const positionerId = createSignal("");
	const popupId = createSignal("");
	const { get: getIsHidden, set: setIsHidden } = createSignal(false);
	const getIsOpen = computed(() => {
		const canOpen = !getDisabled() && anchorElement.get();
		const openValue = getOpen() ?? getDefaultOpen();
		return canOpen ? openValue : false;
	});
	const requestOpenChange = (open) => {
		if (getDisabled()) return;
		const event = new OpenChangeEvent(open);
		dispatchOpenChangeEvent(event);
		if (event.defaultPrevented) return;
		setOpen(open);
	};
	const requestOpenToggle = () => {
		requestOpenChange(!getIsOpen());
	};
	return {
		getIsOpen,
		getIsHidden,
		setIsHidden,
		requestOpenChange,
		requestOpenToggle,
		getPositionerId: positionerId.get,
		setPositionerId: positionerId.set,
		getPopupId: popupId.get,
		setPopupId: popupId.set,
		getAnchorElement: anchorElement.get,
		setAnchorElement: anchorElement.set
	};
}
//#endregion
//#region src/overlay/overlay-root.ts
/**
* @internal
*/
const OverlayRootPropsDeclaration = defineProps({
	defaultOpen: {
		default: false,
		attribute: "default-open",
		type: "boolean"
	},
	open: {
		default: null,
		attribute: "open",
		type: "json"
	},
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	}
});
/**
* @internal
*/
function useOverlayStore(host, props) {
	const getDisabled = computed(() => props.disabled.get());
	const dispatchOpenChangeEvent = (event) => {
		host.dispatchEvent(event);
	};
	const store = createOverlayStore(props.open.get, props.open.set, props.defaultOpen.get, getDisabled, dispatchOpenChangeEvent);
	useAriaDisabled(host, getDisabled);
	return store;
}
//#endregion
export { setupOverlayPositioner as a, OpenChangeEvent as c, OverlayPositionerPropsDeclaration as i, useOverlayStore as n, OverlayPopupPropsDeclaration as o, createOverlayStore as r, setupOverlayPopup as s, OverlayRootPropsDeclaration as t };

//# sourceMappingURL=overlay-root-D2N290z5.js.map