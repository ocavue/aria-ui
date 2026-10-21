import { a as setupOverlayPositioner, i as OverlayPositionerPropsDeclaration, n as useOverlayStore, o as OverlayPopupPropsDeclaration, s as setupOverlayPopup, t as OverlayRootPropsDeclaration } from "./overlay-root-D2N290z5.js";
import { computed, createContext, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { createDelayedToggle, useAriaDescribedBy, useAriaDisabled, useEventListener } from "@aria-ui/utils";
//#region src/tooltip/tooltip-store.ts
/**
* @internal
*/
const TooltipStoreContext = createContext("TooltipStoreContext");
//#endregion
//#region src/tooltip/tooltip-popup.ts
/**
* @internal
*/
const TooltipPopupPropsDeclaration = OverlayPopupPropsDeclaration;
/**
* @internal
*/
function setupTooltipPopup(host, _props) {
	const getStore = TooltipStoreContext.consume(host);
	setupOverlayPopup(host, getStore);
	onMount(host, () => {
		host.role = "tooltip";
	});
}
/**
* `<aria-ui-tooltip-popup>` custom element.
*
* Properties: {@link TooltipPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
*/
var TooltipPopupElement = class extends defineCustomElement(setupTooltipPopup, TooltipPopupPropsDeclaration) {};
/**
* @internal
*/
function registerTooltipPopupElement() {
	registerCustomElement("aria-ui-tooltip-popup", TooltipPopupElement);
}
//#endregion
//#region src/tooltip/tooltip-positioner.ts
/**
* @internal
*/
const TooltipPositionerPropsDeclaration = OverlayPositionerPropsDeclaration;
/**
* @internal
*/
function setupTooltipPositioner(host, props) {
	setupOverlayPositioner(host, props, TooltipStoreContext.consume(host));
}
/**
* `<aria-ui-tooltip-positioner>` custom element.
*
* Properties: {@link TooltipPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the tooltip is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var TooltipPositionerElement = class extends defineCustomElement(setupTooltipPositioner, TooltipPositionerPropsDeclaration) {};
/**
* @internal
*/
function registerTooltipPositionerElement() {
	registerCustomElement("aria-ui-tooltip-positioner", TooltipPositionerElement);
}
//#endregion
//#region src/tooltip/tooltip-group.ts
const TOOLTIP_GROUP_TIMEOUT = 400;
let lastCloseTimestamp = 0;
function notifyTooltipClosed() {
	lastCloseTimestamp = Date.now();
}
function shouldSkipOpenDelay() {
	return Date.now() - lastCloseTimestamp < TOOLTIP_GROUP_TIMEOUT;
}
//#endregion
//#region src/tooltip/tooltip-root.ts
/**
* @internal
*/
const TooltipRootPropsDeclaration = OverlayRootPropsDeclaration;
/**
* @internal
*/
function setupTooltipRoot(host, props) {
	const store = useOverlayStore(host, props);
	TooltipStoreContext.provide(host, store);
	useEventListener(host, "openChange", (event) => {
		if (!event.detail) notifyTooltipClosed();
	});
}
/**
* `<aria-ui-tooltip-root>` custom element.
*
* Properties: {@link TooltipRootProps}
*
* Events: {@link TooltipRootEvents}
*/
var TooltipRootElement = class extends defineCustomElement(setupTooltipRoot, TooltipRootPropsDeclaration) {};
/**
* @internal
*/
function registerTooltipRootElement() {
	registerCustomElement("aria-ui-tooltip-root", TooltipRootElement);
}
//#endregion
//#region src/tooltip/tooltip-trigger.ts
/**
* @internal
*/
const TooltipTriggerPropsDeclaration = /* @__PURE__ */ defineProps({
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	},
	openDelay: {
		default: 600,
		attribute: "open-delay",
		type: "number"
	},
	closeDelay: {
		default: 0,
		attribute: "close-delay",
		type: "number"
	}
});
/**
* @internal
*/
function setupTooltipTrigger(host, props) {
	const getDisabled = props.disabled.get;
	const getStore = TooltipStoreContext.consume(host);
	const getOpen = computed(() => getStore()?.getIsOpen());
	const getPopupId = computed(() => getStore()?.getPopupId());
	useEffect(host, () => {
		getStore()?.setAnchorElement(host);
	});
	const getAriaDescribedBy = computed(() => {
		const open = getOpen();
		const popupId = getPopupId();
		return open && popupId ? popupId : void 0;
	});
	useAriaDescribedBy(host, getAriaDescribedBy);
	useAriaDisabled(host, getDisabled);
	useEffect(host, () => {
		if (getDisabled()) return;
		const store = getStore();
		if (!store) return;
		const openDelay = props.openDelay.get();
		const closeDelay = props.closeDelay.get();
		let isHovered = false;
		let isFocused = false;
		const toggle = createDelayedToggle(() => store.requestOpenChange(true), () => store.requestOpenChange(false));
		const onMouseEnter = () => {
			isHovered = true;
			toggle.open(shouldSkipOpenDelay() ? 0 : openDelay);
		};
		const onMouseLeave = () => {
			isHovered = false;
			if (!isFocused) toggle.close(closeDelay);
		};
		const onFocusIn = () => {
			isFocused = true;
			toggle.open(shouldSkipOpenDelay() ? 0 : openDelay);
		};
		const onFocusOut = () => {
			isFocused = false;
			if (!isHovered) toggle.close(closeDelay);
		};
		const onKeyDown = (event) => {
			if (event.key === "Escape" && store.getIsOpen()) {
				toggle.dispose();
				store.requestOpenChange(false);
			}
		};
		const controller = new AbortController();
		const { signal } = controller;
		host.addEventListener("mouseenter", onMouseEnter, { signal });
		host.addEventListener("mouseleave", onMouseLeave, { signal });
		host.addEventListener("focusin", onFocusIn, { signal });
		host.addEventListener("focusout", onFocusOut, { signal });
		host.addEventListener("keydown", onKeyDown, { signal });
		return () => {
			controller.abort();
			toggle.dispose();
		};
	});
}
/**
* `<aria-ui-tooltip-trigger>` custom element.
*
* Properties: {@link TooltipTriggerProps}
*/
var TooltipTriggerElement = class extends defineCustomElement(setupTooltipTrigger, TooltipTriggerPropsDeclaration) {};
/**
* @internal
*/
function registerTooltipTriggerElement() {
	registerCustomElement("aria-ui-tooltip-trigger", TooltipTriggerElement);
}
//#endregion
export { TooltipRootElement as a, setupTooltipRoot as c, registerTooltipPositionerElement as d, setupTooltipPositioner as f, setupTooltipPopup as g, registerTooltipPopupElement as h, setupTooltipTrigger as i, TooltipPositionerElement as l, TooltipPopupPropsDeclaration as m, TooltipTriggerPropsDeclaration as n, TooltipRootPropsDeclaration as o, TooltipPopupElement as p, registerTooltipTriggerElement as r, registerTooltipRootElement as s, TooltipTriggerElement as t, TooltipPositionerPropsDeclaration as u };

//# sourceMappingURL=tooltip-trigger-BEySFgEM.js.map