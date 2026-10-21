import { c as ListboxItemElement, f as ListboxEmptyElement, m as registerListboxEmptyElement, o as registerListboxRootElement, t as ListboxRootElement, u as registerListboxItemElement } from "./listbox-root-3irWWzRe.js";
import { C as registerMenuPopupElement, D as registerMenuItemElement, T as MenuItemElement, _ as MenuPositionerElement, a as MenuSubmenuTriggerElement, d as registerMenuSubmenuRootElement, h as registerMenuRootElement, l as MenuSubmenuRootElement, p as MenuRootElement, r as registerMenuTriggerElement, s as registerMenuSubmenuTriggerElement, t as MenuTriggerElement, x as MenuPopupElement, y as registerMenuPositionerElement } from "./menu-trigger-KByWMr1k.js";
import { a as PopoverRootElement, d as registerPopoverPositionerElement, h as registerPopoverPopupElement, l as PopoverPositionerElement, p as PopoverPopupElement, r as registerPopoverTriggerElement, s as registerPopoverRootElement, t as PopoverTriggerElement } from "./popover-trigger-BKJBkeNb.js";
import { a as TooltipRootElement, d as registerTooltipPositionerElement, h as registerTooltipPopupElement, l as TooltipPositionerElement, p as TooltipPopupElement, r as registerTooltipTriggerElement, s as registerTooltipRootElement, t as TooltipTriggerElement } from "./tooltip-trigger-BEySFgEM.js";
//#region src/index.ts
/**
* Register all custom elements:
*
* - 'aria-ui-listbox-root'
* - 'aria-ui-listbox-item'
* - 'aria-ui-listbox-empty'
* - 'aria-ui-popover-popup'
* - 'aria-ui-popover-positioner'
* - 'aria-ui-popover-root'
* - 'aria-ui-popover-trigger'
* - 'aria-ui-tooltip-popup'
* - 'aria-ui-tooltip-positioner'
* - 'aria-ui-tooltip-root'
* - 'aria-ui-tooltip-trigger'
*/
function registerElements() {
	if (typeof window === "undefined") return;
	registerListboxRootElement();
	registerListboxItemElement();
	registerListboxEmptyElement();
	registerMenuRootElement();
	registerMenuTriggerElement();
	registerMenuPopupElement();
	registerMenuPositionerElement();
	registerMenuItemElement();
	registerMenuSubmenuRootElement();
	registerMenuSubmenuTriggerElement();
	registerPopoverRootElement();
	registerPopoverTriggerElement();
	registerPopoverPopupElement();
	registerPopoverPositionerElement();
	registerTooltipRootElement();
	registerTooltipTriggerElement();
	registerTooltipPopupElement();
	registerTooltipPositionerElement();
}
//#endregion
export { ListboxEmptyElement, ListboxItemElement, ListboxRootElement, MenuItemElement, MenuPopupElement, MenuPositionerElement, MenuRootElement, MenuSubmenuRootElement, MenuSubmenuTriggerElement, MenuTriggerElement, PopoverPopupElement, PopoverPositionerElement, PopoverRootElement, PopoverTriggerElement, TooltipPopupElement, TooltipPositionerElement, TooltipRootElement, TooltipTriggerElement, registerElements, registerListboxEmptyElement, registerListboxItemElement, registerListboxRootElement, registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement, registerPopoverPopupElement, registerPopoverPositionerElement, registerPopoverRootElement, registerPopoverTriggerElement, registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement };

//# sourceMappingURL=index.js.map