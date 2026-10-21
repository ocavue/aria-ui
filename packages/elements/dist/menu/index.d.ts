import { t as SelectEvent } from "../index-BGvzXBYK.js";
import { A as MenuPopupProps, C as setupMenuRoot, D as registerMenuPositionerElement, E as MenuPositionerPropsDeclaration, F as MenuItemEvents, I as MenuItemProps, L as MenuItemPropsDeclaration, M as registerMenuPopupElement, N as setupMenuPopup, O as setupMenuPositioner, P as MenuItemElement, R as registerMenuItemElement, S as registerMenuRootElement, T as MenuPositionerProps, _ as setupMenuSubmenuRoot, a as registerMenuTriggerElement, b as MenuRootProps, c as MenuSubmenuTriggerProps, d as setupMenuSubmenuTrigger, f as MenuSubmenuRootElement, g as registerMenuSubmenuRootElement, h as MenuSubmenuRootPropsDeclaration, i as MenuTriggerPropsDeclaration, j as MenuPopupPropsDeclaration, k as MenuPopupElement, l as MenuSubmenuTriggerPropsDeclaration, m as MenuSubmenuRootProps, n as MenuTriggerEvents, o as setupMenuTrigger, p as MenuSubmenuRootEvents, r as MenuTriggerProps, s as MenuSubmenuTriggerElement, t as MenuTriggerElement, u as registerMenuSubmenuTriggerElement, v as MenuRootElement, w as MenuPositionerElement, x as MenuRootPropsDeclaration, y as MenuRootEvents, z as setupMenuItem } from "../menu-trigger-C0GSjmq6.js";
import { l as OpenChangeEvent, s as OverlayStore } from "../overlay-root-6Xic5pRI.js";
import { Context } from "@aria-ui/core";
import { CollectionStore } from "@aria-ui/utils";
//#region src/menu/menu-store.d.ts
/**
 * @internal
 */
interface MenuStore extends CollectionStore {
  overlayStore: OverlayStore;
  getParentStore(): MenuStore | undefined;
}
/**
 * @internal
 */
declare function createMenuStore(overlayStore: OverlayStore, getParentStore?: () => MenuStore | undefined): MenuStore;
/**
 * @internal
 */
declare const MenuStoreContext: Context<MenuStore>;
/**
 * @internal
 */
declare function closeMenuTree(store: MenuStore): void;
//#endregion
export { MenuItemElement, type MenuItemEvents, type MenuItemProps, MenuItemPropsDeclaration, MenuPopupElement, type MenuPopupProps, MenuPopupPropsDeclaration, MenuPositionerElement, type MenuPositionerProps, MenuPositionerPropsDeclaration, MenuRootElement, type MenuRootEvents, type MenuRootProps, MenuRootPropsDeclaration, type MenuStore, MenuStoreContext, MenuSubmenuRootElement, type MenuSubmenuRootEvents, type MenuSubmenuRootProps, MenuSubmenuRootPropsDeclaration, MenuSubmenuTriggerElement, type MenuSubmenuTriggerProps, MenuSubmenuTriggerPropsDeclaration, MenuTriggerElement, type MenuTriggerEvents, type MenuTriggerProps, MenuTriggerPropsDeclaration, OpenChangeEvent, SelectEvent, closeMenuTree, createMenuStore, registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement, setupMenuItem, setupMenuPopup, setupMenuPositioner, setupMenuRoot, setupMenuSubmenuRoot, setupMenuSubmenuTrigger, setupMenuTrigger };
//# sourceMappingURL=index.d.ts.map