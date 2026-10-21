import { t as SelectEvent } from "./index-BGvzXBYK.js";
import { i as OverlayPositionerProps, l as OpenChangeEvent, t as OverlayRootProps } from "./overlay-root-6Xic5pRI.js";
import { HostElement, State } from "@aria-ui/core";
import { Placement } from "@floating-ui/dom";
//#region src/menu/menu-item.d.ts
interface MenuItemProps {
  /**
   * The unique value for this menu item.
   *
   * @default ""
   */
  value: string;
  /**
   * Whether this menu item is disabled.
   *
   * @default false
   */
  disabled: boolean;
  /**
   * Whether to close the menu when the item is pressed.
   *
   * @default true
   */
  closeOnSelect: boolean;
}
/**
 * @internal
 */
declare const MenuItemPropsDeclaration: Readonly<{
  value: import("@aria-ui/core").PropDeclaration<string>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
  closeOnSelect: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface MenuItemEvents {
  /**
   * Emitted when the the item is selected.
   */
  select: SelectEvent;
}
/**
 * @internal
 */
declare function setupMenuItem(host: HostElement, props: State<MenuItemProps>): void;
declare const MenuItemElement_base: import("@aria-ui/core").HostElementConstructor<MenuItemProps>;
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
declare class MenuItemElement extends MenuItemElement_base {}
/**
 * @internal
 */
declare function registerMenuItemElement(): void;
//#endregion
//#region src/menu/menu-popup.d.ts
interface MenuPopupProps {
  /**
   * By default, the MenuPopup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | EventTarget | null;
}
/**
 * @internal
 */
declare const MenuPopupPropsDeclaration: Readonly<{
  eventTarget: import("@aria-ui/core").PropDeclaration<HTMLElement | EventTarget | null>;
}>;
/**
 * @internal
 */
declare function setupMenuPopup(host: HostElement, props: State<MenuPopupProps>): void;
declare const MenuPopupElement_base: import("@aria-ui/core").HostElementConstructor<MenuPopupProps>;
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
declare class MenuPopupElement extends MenuPopupElement_base {}
/**
 * @internal
 */
declare function registerMenuPopupElement(): void;
//#endregion
//#region src/menu/menu-positioner.d.ts
interface MenuPositionerProps extends Omit<OverlayPositionerProps, 'placement'> {
  /**
   * The initial placement of the floating element
   *
   * @default "bottom-start"
   */
  placement: Placement;
}
/**
 * @internal
 */
declare const MenuPositionerPropsDeclaration: Readonly<{
  placement: import("@aria-ui/core").PropDeclaration<Placement>;
  shift: import("@aria-ui/core").PropDeclaration<boolean>;
  inline: import("@aria-ui/core").PropDeclaration<boolean>;
  boundary: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").Boundary>;
  rootBoundary: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").RootBoundary>;
  elementContext: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").ElementContext>;
  altBoundary: import("@aria-ui/core").PropDeclaration<boolean>;
  strategy: import("@aria-ui/core").PropDeclaration<"absolute" | "fixed">;
  autoUpdate: import("@aria-ui/core").PropDeclaration<boolean | import("@floating-ui/dom").AutoUpdateOptions>;
  hoist: import("@aria-ui/core").PropDeclaration<boolean>;
  offset: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").OffsetOptions>;
  flip: import("@aria-ui/core").PropDeclaration<boolean | Placement[]>;
  overlap: import("@aria-ui/core").PropDeclaration<boolean>;
  fitViewport: import("@aria-ui/core").PropDeclaration<boolean>;
  sameWidth: import("@aria-ui/core").PropDeclaration<boolean>;
  sameHeight: import("@aria-ui/core").PropDeclaration<boolean>;
  hide: import("@aria-ui/core").PropDeclaration<boolean>;
  overflowPadding: import("@aria-ui/core").PropDeclaration<number>;
}>;
/**
 * @internal
 */
declare function setupMenuPositioner(host: HostElement, props: State<MenuPositionerProps>): void;
declare const MenuPositionerElement_base: import("@aria-ui/core").HostElementConstructor<MenuPositionerProps>;
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
declare class MenuPositionerElement extends MenuPositionerElement_base {}
/**
 * @internal
 */
declare function registerMenuPositionerElement(): void;
//#endregion
//#region src/menu/menu-root.d.ts
interface MenuRootProps extends OverlayRootProps {}
/**
 * @internal
 */
declare const MenuRootPropsDeclaration: Readonly<{
  defaultOpen: import("@aria-ui/core").PropDeclaration<boolean>;
  open: import("@aria-ui/core").PropDeclaration<boolean | null>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface MenuRootEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent;
}
/**
 * @internal
 */
declare function setupMenuRoot(host: HostElement, props: State<MenuRootProps>): void;
declare const MenuRootElement_base: import("@aria-ui/core").HostElementConstructor<MenuRootProps>;
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
declare class MenuRootElement extends MenuRootElement_base {}
/**
 * @internal
 */
declare function registerMenuRootElement(): void;
//#endregion
//#region src/menu/menu-submenu-root.d.ts
interface MenuSubmenuRootProps extends OverlayRootProps {}
/**
 * @internal
 */
declare const MenuSubmenuRootPropsDeclaration: Readonly<{
  defaultOpen: import("@aria-ui/core").PropDeclaration<boolean>;
  open: import("@aria-ui/core").PropDeclaration<boolean | null>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface MenuSubmenuRootEvents {
  /**
   * Emitted when the submenu is opened or closed.
   */
  openChange: OpenChangeEvent;
}
/**
 * @internal
 */
declare function setupMenuSubmenuRoot(host: HostElement, props: State<MenuSubmenuRootProps>): void;
declare const MenuSubmenuRootElement_base: import("@aria-ui/core").HostElementConstructor<MenuSubmenuRootProps>;
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
declare class MenuSubmenuRootElement extends MenuSubmenuRootElement_base {}
/**
 * @internal
 */
declare function registerMenuSubmenuRootElement(): void;
//#endregion
//#region src/menu/menu-submenu-trigger.d.ts
interface MenuSubmenuTriggerProps {
  /**
   * The unique value for this submenu trigger in the parent menu.
   *
   * @default ""
   */
  value: string;
  /**
   * Whether this submenu trigger is disabled.
   *
   * @default false
   */
  disabled: boolean;
}
/**
 * @internal
 */
declare const MenuSubmenuTriggerPropsDeclaration: Readonly<{
  value: import("@aria-ui/core").PropDeclaration<string>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
/**
 * @internal
 */
declare function setupMenuSubmenuTrigger(host: HostElement, props: State<MenuSubmenuTriggerProps>): void;
declare const MenuSubmenuTriggerElement_base: import("@aria-ui/core").HostElementConstructor<MenuSubmenuTriggerProps>;
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
declare class MenuSubmenuTriggerElement extends MenuSubmenuTriggerElement_base {}
/**
 * @internal
 */
declare function registerMenuSubmenuTriggerElement(): void;
//#endregion
//#region src/menu/menu-trigger.d.ts
interface MenuTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean;
}
/**
 * @internal
 */
declare const MenuTriggerPropsDeclaration: Readonly<{
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface MenuTriggerEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent;
}
/**
 * @internal
 */
declare function setupMenuTrigger(host: HostElement, props: State<MenuTriggerProps>): void;
declare const MenuTriggerElement_base: import("@aria-ui/core").HostElementConstructor<MenuTriggerProps>;
/**
 * `<aria-ui-menu-trigger>` custom element.
 *
 * Properties: {@link MenuTriggerProps}
 *
 * Events: {@link MenuTriggerEvents}
 */
declare class MenuTriggerElement extends MenuTriggerElement_base {}
/**
 * @internal
 */
declare function registerMenuTriggerElement(): void;
//#endregion
export { MenuPopupProps as A, setupMenuRoot as C, registerMenuPositionerElement as D, MenuPositionerPropsDeclaration as E, MenuItemEvents as F, MenuItemProps as I, MenuItemPropsDeclaration as L, registerMenuPopupElement as M, setupMenuPopup as N, setupMenuPositioner as O, MenuItemElement as P, registerMenuItemElement as R, registerMenuRootElement as S, MenuPositionerProps as T, setupMenuSubmenuRoot as _, registerMenuTriggerElement as a, MenuRootProps as b, MenuSubmenuTriggerProps as c, setupMenuSubmenuTrigger as d, MenuSubmenuRootElement as f, registerMenuSubmenuRootElement as g, MenuSubmenuRootPropsDeclaration as h, MenuTriggerPropsDeclaration as i, MenuPopupPropsDeclaration as j, MenuPopupElement as k, MenuSubmenuTriggerPropsDeclaration as l, MenuSubmenuRootProps as m, MenuTriggerEvents as n, setupMenuTrigger as o, MenuSubmenuRootEvents as p, MenuTriggerProps as r, MenuSubmenuTriggerElement as s, MenuTriggerElement as t, registerMenuSubmenuTriggerElement as u, MenuRootElement as v, MenuPositionerElement as w, MenuRootPropsDeclaration as x, MenuRootEvents as y, setupMenuItem as z };
//# sourceMappingURL=menu-trigger-C0GSjmq6.d.ts.map