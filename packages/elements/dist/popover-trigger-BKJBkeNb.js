import { a as setupOverlayPositioner, i as OverlayPositionerPropsDeclaration, n as useOverlayStore, o as OverlayPopupPropsDeclaration, s as setupOverlayPopup, t as OverlayRootPropsDeclaration } from "./overlay-root-D2N290z5.js";
import { computed, createContext, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { useAriaControls, useAriaDisabled, useAriaExpanded, useHover, usePress } from "@aria-ui/utils";
//#region src/popover/popover-store.ts
/**
* @internal
*/
const PopoverStoreContext = createContext("PopoverStoreContext");
//#endregion
//#region src/popover/popover-popup.ts
/**
* @internal
*/
const PopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration;
/**
* @internal
*/
function setupPopoverPopup(host, _props) {
	const getStore = PopoverStoreContext.consume(host);
	setupOverlayPopup(host, getStore);
	onMount(host, () => {
		host.role = "dialog";
	});
}
/**
* `<aria-ui-popover-popup>` custom element.
*
* Properties: {@link PopoverPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
*/
var PopoverPopupElement = class extends defineCustomElement(setupPopoverPopup, PopoverPopupPropsDeclaration) {};
/**
* @internal
*/
function registerPopoverPopupElement() {
	registerCustomElement("aria-ui-popover-popup", PopoverPopupElement);
}
//#endregion
//#region src/popover/popover-positioner.ts
/**
* @internal
*/
const PopoverPositionerPropsDeclaration = OverlayPositionerPropsDeclaration;
/**
* @internal
*/
function setupPopoverPositioner(host, props) {
	setupOverlayPositioner(host, props, PopoverStoreContext.consume(host));
}
/**
* `<aria-ui-popover-positioner>` custom element.
*
* Properties: {@link PopoverPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the popover is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var PopoverPositionerElement = class extends defineCustomElement(setupPopoverPositioner, PopoverPositionerPropsDeclaration) {};
/**
* @internal
*/
function registerPopoverPositionerElement() {
	registerCustomElement("aria-ui-popover-positioner", PopoverPositionerElement);
}
//#endregion
//#region src/popover/popover-root.ts
/**
* @internal
*/
const PopoverRootPropsDeclaration = defineProps({
	...OverlayRootPropsDeclaration,
	modal: {
		default: false,
		attribute: "modal",
		type: "boolean"
	}
});
/**
* @internal
*/
function setupPopoverRoot(host, props) {
	const store = useOverlayStore(host, props);
	PopoverStoreContext.provide(host, store);
}
/**
* `<aria-ui-popover-root>` custom element.
*
* Properties: {@link PopoverRootProps}
*
* Events: {@link PopoverRootEvents}
*/
var PopoverRootElement = class extends defineCustomElement(setupPopoverRoot, PopoverRootPropsDeclaration) {};
/**
* @internal
*/
function registerPopoverRootElement() {
	registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
//#endregion
//#region src/popover/popover-trigger.ts
/**
* @internal
*/
const PopoverTriggerPropsDeclaration = /* @__PURE__ */ defineProps({
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	},
	openOnHover: {
		default: false,
		attribute: "open-on-hover",
		type: "boolean"
	},
	delay: {
		default: 300,
		attribute: "delay",
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
function setupPopoverTrigger(host, props) {
	const getDisabled = props.disabled.get;
	const getStore = PopoverStoreContext.consume(host);
	const getOpen = computed(() => getStore()?.getIsOpen());
	const getPopupId = computed(() => getStore()?.getPopupId());
	usePress(host, () => {
		if (getDisabled()) return;
		getStore()?.requestOpenToggle();
	});
	useEffect(host, () => {
		if (!props.openOnHover.get()) return;
		if (getDisabled()) return;
		const store = getStore();
		if (!store) return;
		const openDelay = props.delay.get();
		const closeDelay = props.closeDelay.get();
		return useHover(host, {
			openDelay,
			closeDelay,
			onOpen: () => store.requestOpenChange(true),
			onClose: () => store.requestOpenChange(false)
		});
	});
	useEffect(host, () => {
		getStore()?.setAnchorElement(host);
	});
	useAriaExpanded(host, getOpen);
	useAriaDisabled(host, getDisabled);
	const getAriaControls = computed(() => getOpen() ? getPopupId() : void 0);
	useAriaControls(host, getAriaControls);
}
/**
* `<aria-ui-popover-trigger>` custom element.
*
* Properties: {@link PopoverTriggerProps}
*
* Events: {@link PopoverTriggerEvents}
*/
var PopoverTriggerElement = class extends defineCustomElement(setupPopoverTrigger, PopoverTriggerPropsDeclaration) {};
/**
* @internal
*/
function registerPopoverTriggerElement() {
	registerCustomElement("aria-ui-popover-trigger", PopoverTriggerElement);
}
//#endregion
export { PopoverRootElement as a, setupPopoverRoot as c, registerPopoverPositionerElement as d, setupPopoverPositioner as f, setupPopoverPopup as g, registerPopoverPopupElement as h, setupPopoverTrigger as i, PopoverPositionerElement as l, PopoverPopupPropsDeclaration as m, PopoverTriggerPropsDeclaration as n, PopoverRootPropsDeclaration as o, PopoverPopupElement as p, registerPopoverTriggerElement as r, registerPopoverRootElement as s, PopoverTriggerElement as t, PopoverPositionerPropsDeclaration as u };

//# sourceMappingURL=popover-trigger-BKJBkeNb.js.map