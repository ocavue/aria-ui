import { t as SelectEvent } from "./events-HqWWLGoO.js";
import { a as setupOverlayPositioner, i as OverlayPositionerPropsDeclaration, r as createOverlayStore, s as setupOverlayPopup, t as OverlayRootPropsDeclaration } from "./overlay-root-D2N290z5.js";
import { computed, createContext, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { createCollectionStore, getAriaHasPopup, handleCollectionNavigation, setAriaHasPopup, setupCollectionItem, useAriaActivedescendant, useAriaControls, useAriaDisabled, useAriaExpanded, useElementId, useEventListener, usePress } from "@aria-ui/utils";
import { trackDismissableElement } from "@zag-js/dismissable";
import { isHTMLElement } from "@zag-js/dom-query";
//#region src/menu/menu-store.ts
/**
* @internal
*/
function createMenuStore(overlayStore, getParentStore) {
	return {
		...createCollectionStore(),
		overlayStore,
		getParentStore: getParentStore || (() => void 0)
	};
}
/**
* @internal
*/
const MenuStoreContext = createContext("MenuStoreContext");
/**
* @internal
*/
function closeMenuTree(store) {
	store.overlayStore.requestOpenChange(false);
	const parentStore = store.getParentStore();
	if (parentStore) closeMenuTree(parentStore);
}
//#endregion
//#region src/menu/menu-item.ts
/**
* @internal
*/
const MenuItemPropsDeclaration = /* @__PURE__ */ defineProps({
	value: {
		default: "",
		attribute: "value",
		type: "string"
	},
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	},
	closeOnSelect: {
		default: true,
		attribute: "close-on-select",
		type: "boolean"
	}
});
/**
* @internal
*/
function setupMenuItem(host, props) {
	onMount(host, () => {
		host.role = "menuitem";
	});
	useElementId(host);
	const getStore = MenuStoreContext.consume(host);
	setupCollectionItem(host, props, getStore);
	useEventListener(host, "click", () => {
		if (props.disabled.get()) return;
		const store = getStore();
		if (!store) return;
		const value = props.value.get();
		store.setHighlightedValue(value);
		host.dispatchEvent(new SelectEvent(value));
		if (props.closeOnSelect.get()) closeMenuTree(store);
	});
}
/**
* `<aria-ui-menu-item>` custom element.
*
* Properties: {@link MenuItemProps}
*
* Events: {@link MenuItemEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-highlighted` | Present when the item is the currently highlighted option |
*/
var MenuItemElement = class extends defineCustomElement(setupMenuItem, MenuItemPropsDeclaration) {};
/**
* @internal
*/
function registerMenuItemElement() {
	registerCustomElement("aria-ui-menu-item", MenuItemElement);
}
//#endregion
//#region src/menu/menu-popup.ts
/**
* @internal
*/
const MenuPopupPropsDeclaration = /* @__PURE__ */ defineProps({ eventTarget: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupMenuPopup(host, props) {
	const getMenuStore = MenuStoreContext.consume(host);
	const getOverlayStore = computed(() => getMenuStore()?.overlayStore);
	const id = useElementId(host);
	useEffect(host, () => {
		getOverlayStore()?.setPopupId(id);
	});
	onMount(host, () => {
		host.role = "menu";
		host.tabIndex = -1;
	});
	setupOverlayPopup(host, getOverlayStore);
	useAriaActivedescendant(host, () => {
		const menuStore = getMenuStore();
		if (!menuStore) return;
		const highlightedValue = menuStore.getHighlightedValue();
		if (highlightedValue == null) return;
		return menuStore.getCollection().getElement(highlightedValue)?.id;
	});
	useEffect(host, () => {
		const menuStore = getMenuStore();
		const overlayStore = getOverlayStore();
		if (!overlayStore || !menuStore) return;
		if (overlayStore.getIsOpen()) {
			resetTypeahead();
			const id = requestAnimationFrame(() => {
				host.focus();
				const collection = menuStore.getCollection();
				menuStore.setHighlightedValue(collection.first());
			});
			return () => cancelAnimationFrame(id);
		} else menuStore.setHighlightedValue(void 0);
	});
	const handleKeydown = (event) => {
		if (event.isComposing || event.defaultPrevented) return;
		const menuStore = getMenuStore();
		const overlayStore = getOverlayStore();
		const parentStore = menuStore?.getParentStore();
		if (!menuStore || !overlayStore) return;
		if (!overlayStore.getIsOpen()) return;
		if (handleCollectionNavigation(event, menuStore.getCollection(), () => menuStore.getHighlightedValue(), (v) => menuStore.setHighlightedValue(v), "vertical", true)) return;
		const highlightedValue = menuStore.getHighlightedValue();
		const collection = menuStore.getCollection();
		switch (event.key) {
			case "Enter":
			case " ": {
				if (highlightedValue == null) return;
				const highlightedElement = collection.getElement(highlightedValue);
				if (!highlightedElement) return;
				event.preventDefault();
				event.stopPropagation();
				if (getAriaHasPopup(highlightedElement) === "menu") highlightedElement.dispatchEvent(new Event("aria-ui:open-submenu", { bubbles: false }));
				else highlightedElement.click();
				return;
			}
			case "ArrowRight": {
				if (highlightedValue == null) return;
				const highlightedElement = collection.getElement(highlightedValue);
				if (!highlightedElement) return;
				event.preventDefault();
				event.stopPropagation();
				highlightedElement.dispatchEvent(new Event("aria-ui:open-submenu", { bubbles: false }));
				return;
			}
			case "ArrowLeft":
				if (parentStore) {
					event.preventDefault();
					event.stopPropagation();
					parentStore.overlayStore.requestOpenChange(false);
				}
				return;
			default:
				if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
					event.stopPropagation();
					handleTypeahead(event.key, menuStore);
				}
				return;
		}
	};
	useEffect(host, () => {
		const abortController = new AbortController();
		(props.eventTarget.get() || host).addEventListener("keydown", handleKeydown, { signal: abortController.signal });
		return () => {
			abortController.abort();
		};
	});
	const getIsOpen = () => {
		const store = getOverlayStore();
		if (!store) return false;
		return store.getIsOpen();
	};
	useEffect(host, () => {
		if (!getIsOpen()) return;
		const exclude = () => {
			const anchorElement = getOverlayStore()?.getAnchorElement();
			return anchorElement && isHTMLElement(anchorElement) ? [anchorElement] : [];
		};
		let shouldCloseMenuTree = false;
		return trackDismissableElement(host, {
			type: "menu",
			exclude,
			onEscapeKeyDown() {
				shouldCloseMenuTree = false;
			},
			onPointerDownOutside() {
				shouldCloseMenuTree = true;
			},
			onFocusOutside() {
				shouldCloseMenuTree = true;
			},
			onDismiss() {
				const menuStore = getMenuStore();
				if (menuStore && shouldCloseMenuTree) closeMenuTree(menuStore);
				const overlayStore = getOverlayStore();
				if (overlayStore?.getIsOpen()) overlayStore.requestOpenChange(false);
			}
		});
	});
}
let typeaheadBuffer = "";
let typeaheadTimer;
const TYPEAHEAD_TIMEOUT = 500;
function resetTypeahead() {
	typeaheadBuffer = "";
	if (typeaheadTimer) {
		clearTimeout(typeaheadTimer);
		typeaheadTimer = void 0;
	}
}
function handleTypeahead(char, menuStore) {
	if (typeaheadTimer) clearTimeout(typeaheadTimer);
	typeaheadBuffer += char.toLowerCase();
	typeaheadTimer = setTimeout(() => {
		typeaheadBuffer = "";
	}, TYPEAHEAD_TIMEOUT);
	const values = menuStore.getCollection().getValues();
	for (const value of values) if (value.toLowerCase().startsWith(typeaheadBuffer)) {
		menuStore.setHighlightedValue(value);
		break;
	}
}
/**
* `<aria-ui-menu-popup>` custom element.
*
* Properties: {@link MenuPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
*/
var MenuPopupElement = class extends defineCustomElement(setupMenuPopup, MenuPopupPropsDeclaration) {};
/**
* @internal
*/
function registerMenuPopupElement() {
	registerCustomElement("aria-ui-menu-popup", MenuPopupElement);
}
//#endregion
//#region src/menu/menu-positioner.ts
/**
* @internal
*/
const MenuPositionerPropsDeclaration = defineProps({
	...OverlayPositionerPropsDeclaration,
	placement: {
		default: "bottom-start",
		attribute: "placement",
		type: "string"
	}
});
/**
* @internal
*/
function setupMenuPositioner(host, props) {
	const getMenuStore = MenuStoreContext.consume(host);
	const getOverlayStore = () => getMenuStore()?.overlayStore;
	setupOverlayPositioner(host, props, getOverlayStore);
}
/**
* `<aria-ui-menu-positioner>` custom element.
*
* Properties: {@link MenuPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var MenuPositionerElement = class extends defineCustomElement(setupMenuPositioner, MenuPositionerPropsDeclaration) {};
/**
* @internal
*/
function registerMenuPositionerElement() {
	registerCustomElement("aria-ui-menu-positioner", MenuPositionerElement);
}
//#endregion
//#region src/menu/menu-root.ts
/**
* @internal
*/
const MenuRootPropsDeclaration = defineProps({ ...OverlayRootPropsDeclaration });
/**
* @internal
*/
function setupMenuRoot(host, props) {
	const getDisabled = computed(() => props.disabled.get());
	const menuStore = createMenuStore(createOverlayStore(props.open.get, props.open.set, props.defaultOpen.get, getDisabled, (event) => host.dispatchEvent(event)));
	onMount(host, () => {
		host.dataset.menuRoot = "";
	});
	useAriaDisabled(host, getDisabled);
	MenuStoreContext.provide(host, menuStore);
}
/**
* `<aria-ui-menu-root>` custom element.
*
* Properties: {@link MenuRootProps}
*
* Events: {@link MenuRootEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-menu-root` | Always present on the element |
*/
var MenuRootElement = class extends defineCustomElement(setupMenuRoot, MenuRootPropsDeclaration) {};
/**
* @internal
*/
function registerMenuRootElement() {
	registerCustomElement("aria-ui-menu-root", MenuRootElement);
}
//#endregion
//#region src/menu/menu-submenu-root.ts
/**
* @internal
*/
const MenuSubmenuRootPropsDeclaration = /* @__PURE__ */ defineProps({ ...OverlayRootPropsDeclaration });
/**
* @internal
*/
function setupMenuSubmenuRoot(host, props) {
	const getParentStore = MenuStoreContext.consume(host);
	const overlayStore = createOverlayStore(props.open.get, props.open.set, props.defaultOpen.get, props.disabled.get, (event) => {
		host.dispatchEvent(event);
	});
	onMount(host, () => {
		host.dataset.menuSubmenuRoot = "";
	});
	const menuStore = createMenuStore(overlayStore, getParentStore);
	MenuStoreContext.provide(host, menuStore);
	useEffect(host, () => {
		const parentOverlayStore = getParentStore()?.overlayStore;
		if (!parentOverlayStore) return;
		if (parentOverlayStore.getIsOpen() === false) overlayStore.requestOpenChange(false);
	});
}
/**
* `<aria-ui-menu-submenu-root>` custom element.
*
* Properties: {@link MenuSubmenuRootProps}
*
* Events: {@link MenuSubmenuRootEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-menu-submenu-root` | Always present on the element |
*/
var MenuSubmenuRootElement = class extends defineCustomElement(setupMenuSubmenuRoot, MenuSubmenuRootPropsDeclaration) {};
/**
* @internal
*/
function registerMenuSubmenuRootElement() {
	registerCustomElement("aria-ui-menu-submenu-root", MenuSubmenuRootElement);
}
//#endregion
//#region ../utils/src/aria.ts
function setAriaHasPopup$1(element, value) {
	if (value) element.setAttribute("aria-haspopup", value);
	else element.removeAttribute("aria-haspopup");
}
//#endregion
//#region src/menu/menu-submenu-trigger.ts
const OPEN_DELAY = 200;
const CLOSE_DELAY = 150;
/**
* @internal
*/
const MenuSubmenuTriggerPropsDeclaration = /* @__PURE__ */ defineProps({
	value: {
		default: "",
		attribute: "value",
		type: "string"
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
function setupMenuSubmenuTrigger(host, props) {
	onMount(host, () => {
		host.role = "menuitem";
		setAriaHasPopup$1(host, "menu");
	});
	useElementId(host);
	const getMenuStore = MenuStoreContext.consume(host);
	const getParentStore = () => getMenuStore()?.getParentStore();
	const getOverlayStore = () => getMenuStore()?.overlayStore;
	setupCollectionItem(host, props, getParentStore);
	useEffect(host, () => {
		getMenuStore()?.overlayStore.setAnchorElement(host);
	});
	useEffect(host, () => {
		const store = getOverlayStore();
		if (!store) return;
		const open = store.getIsOpen();
		host.setAttribute("aria-expanded", String(open));
	});
	let openTimer;
	let closeTimer;
	const clearTimers = () => {
		if (openTimer) {
			clearTimeout(openTimer);
			openTimer = void 0;
		}
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = void 0;
		}
	};
	useEventListener(host, "mouseenter", () => {
		if (props.disabled.get()) return;
		clearTimers();
		const store = getOverlayStore();
		if (store && !store.getIsOpen()) openTimer = setTimeout(() => {
			store.requestOpenChange(true);
		}, OPEN_DELAY);
	});
	useEventListener(host, "mouseleave", (event) => {
		clearTimers();
		const store = getOverlayStore();
		if (!store || !store.getIsOpen()) return;
		const relatedTarget = event.relatedTarget;
		const submenuRoot = host.closest("[data-menu-submenu-root]");
		if (submenuRoot && relatedTarget && submenuRoot.contains(relatedTarget)) return;
		closeTimer = setTimeout(() => {
			store.requestOpenChange(false);
		}, CLOSE_DELAY);
	});
	useEffect(host, () => {
		const parentStore = getParentStore();
		if (!parentStore) return;
		const store = getOverlayStore();
		if (!store) return;
		if (parentStore.getHighlightedValue() !== props.value.get() && store.getIsOpen()) {
			const timer = setTimeout(() => store.requestOpenChange(false), CLOSE_DELAY);
			return () => clearTimeout(timer);
		}
	});
	useEventListener(host, "aria-ui:open-submenu", () => {
		getOverlayStore()?.requestOpenChange(true);
	});
	useEventListener(host, "click", () => {
		getOverlayStore()?.requestOpenToggle();
	});
	onMount(host, () => clearTimers);
}
/**
* `<aria-ui-menu-submenu-trigger>` custom element.
*
* Properties: {@link MenuSubmenuTriggerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-highlighted` | Present when the item is the currently highlighted option |
*/
var MenuSubmenuTriggerElement = class extends defineCustomElement(setupMenuSubmenuTrigger, MenuSubmenuTriggerPropsDeclaration) {};
/**
* @internal
*/
function registerMenuSubmenuTriggerElement() {
	registerCustomElement("aria-ui-menu-submenu-trigger", MenuSubmenuTriggerElement);
}
//#endregion
//#region src/menu/menu-trigger.ts
/**
* @internal
*/
const MenuTriggerPropsDeclaration = /* @__PURE__ */ defineProps({ disabled: {
	default: false,
	attribute: "disabled",
	type: "boolean"
} });
/**
* @internal
*/
function setupMenuTrigger(host, props) {
	const getDisabled = props.disabled.get;
	const getMenuStore = MenuStoreContext.consume(host);
	const getOverlayStore = computed(() => getMenuStore()?.overlayStore);
	const getOpen = computed(() => getOverlayStore()?.getIsOpen());
	const getPopupId = computed(() => getOverlayStore()?.getPopupId());
	usePress(host, () => {
		if (getDisabled()) return;
		getOverlayStore()?.requestOpenToggle();
	});
	useEffect(host, () => {
		getOverlayStore()?.setAnchorElement(host);
	});
	useAriaExpanded(host, getOpen);
	useAriaDisabled(host, getDisabled);
	const getAriaControls = computed(() => getOpen() ? getPopupId() : void 0);
	useAriaControls(host, getAriaControls);
	onMount(host, () => {
		setAriaHasPopup(host, "menu");
	});
}
/**
* `<aria-ui-menu-trigger>` custom element.
*
* Properties: {@link MenuTriggerProps}
*
* Events: {@link MenuTriggerEvents}
*/
var MenuTriggerElement = class extends defineCustomElement(setupMenuTrigger, MenuTriggerPropsDeclaration) {};
/**
* @internal
*/
function registerMenuTriggerElement() {
	registerCustomElement("aria-ui-menu-trigger", MenuTriggerElement);
}
//#endregion
export { closeMenuTree as A, registerMenuPopupElement as C, registerMenuItemElement as D, MenuItemPropsDeclaration as E, setupMenuItem as O, MenuPopupPropsDeclaration as S, MenuItemElement as T, MenuPositionerElement as _, MenuSubmenuTriggerElement as a, setupMenuPositioner as b, setupMenuSubmenuTrigger as c, registerMenuSubmenuRootElement as d, setupMenuSubmenuRoot as f, setupMenuRoot as g, registerMenuRootElement as h, setupMenuTrigger as i, createMenuStore as j, MenuStoreContext as k, MenuSubmenuRootElement as l, MenuRootPropsDeclaration as m, MenuTriggerPropsDeclaration as n, MenuSubmenuTriggerPropsDeclaration as o, MenuRootElement as p, registerMenuTriggerElement as r, registerMenuSubmenuTriggerElement as s, MenuTriggerElement as t, MenuSubmenuRootPropsDeclaration as u, MenuPositionerPropsDeclaration as v, setupMenuPopup as w, MenuPopupElement as x, registerMenuPositionerElement as y };

//# sourceMappingURL=menu-trigger-KByWMr1k.js.map