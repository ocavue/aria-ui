import { i as OverlayPositionerProps, l as OpenChangeEvent, t as OverlayRootProps } from "./overlay-root-6Xic5pRI.js";
import { t as OverlayPopupProps } from "./overlay-popup-Rm7Bvix7.js";
import { HostElement, State } from "@aria-ui/core";
//#region src/tooltip/tooltip-popup.d.ts
interface TooltipPopupProps extends OverlayPopupProps {}
/**
 * @internal
 */
declare const TooltipPopupPropsDeclaration: Readonly<{}>;
/**
 * @internal
 */
declare function setupTooltipPopup(host: HostElement, _props: State<TooltipPopupProps>): void;
declare const TooltipPopupElement_base: import("@aria-ui/core").HostElementConstructor<TooltipPopupProps>;
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
declare class TooltipPopupElement extends TooltipPopupElement_base {}
/**
 * @internal
 */
declare function registerTooltipPopupElement(): void;
//#endregion
//#region src/tooltip/tooltip-positioner.d.ts
interface TooltipPositionerProps extends OverlayPositionerProps {}
/**
 * @internal
 */
declare const TooltipPositionerPropsDeclaration: Readonly<{
  strategy: import("@aria-ui/core").PropDeclaration<"absolute" | "fixed">;
  placement: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").Placement>;
  autoUpdate: import("@aria-ui/core").PropDeclaration<boolean | import("@floating-ui/dom").AutoUpdateOptions>;
  hoist: import("@aria-ui/core").PropDeclaration<boolean>;
  offset: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").OffsetOptions>;
  flip: import("@aria-ui/core").PropDeclaration<boolean | import("@floating-ui/dom").Placement[]>;
  shift: import("@aria-ui/core").PropDeclaration<boolean>;
  overlap: import("@aria-ui/core").PropDeclaration<boolean>;
  fitViewport: import("@aria-ui/core").PropDeclaration<boolean>;
  sameWidth: import("@aria-ui/core").PropDeclaration<boolean>;
  sameHeight: import("@aria-ui/core").PropDeclaration<boolean>;
  inline: import("@aria-ui/core").PropDeclaration<boolean>;
  hide: import("@aria-ui/core").PropDeclaration<boolean>;
  boundary: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").Boundary>;
  rootBoundary: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").RootBoundary>;
  overflowPadding: import("@aria-ui/core").PropDeclaration<number>;
  elementContext: import("@aria-ui/core").PropDeclaration<import("@floating-ui/dom").ElementContext>;
  altBoundary: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
/**
 * @internal
 */
declare function setupTooltipPositioner(host: HostElement, props: State<TooltipPositionerProps>): void;
declare const TooltipPositionerElement_base: import("@aria-ui/core").HostElementConstructor<TooltipPositionerProps>;
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
declare class TooltipPositionerElement extends TooltipPositionerElement_base {}
/**
 * @internal
 */
declare function registerTooltipPositionerElement(): void;
//#endregion
//#region src/tooltip/tooltip-root.d.ts
interface TooltipRootProps extends OverlayRootProps {}
/**
 * @internal
 */
declare const TooltipRootPropsDeclaration: Readonly<{
  defaultOpen: import("@aria-ui/core").PropDeclaration<boolean>;
  open: import("@aria-ui/core").PropDeclaration<boolean | null>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface TooltipRootEvents {
  /**
   * Emitted when the tooltip is opened or closed.
   */
  openChange: OpenChangeEvent;
}
declare global {
  interface HTMLElementEventMap {
    openChange: OpenChangeEvent;
  }
}
/**
 * @internal
 */
declare function setupTooltipRoot(host: HostElement, props: State<TooltipRootProps>): void;
declare const TooltipRootElement_base: import("@aria-ui/core").HostElementConstructor<TooltipRootProps>;
/**
 * `<aria-ui-tooltip-root>` custom element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * Events: {@link TooltipRootEvents}
 */
declare class TooltipRootElement extends TooltipRootElement_base {}
/**
 * @internal
 */
declare function registerTooltipRootElement(): void;
//#endregion
//#region src/tooltip/tooltip-trigger.d.ts
interface TooltipTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean;
  /**
   * The delay in milliseconds before opening the tooltip on hover.
   * @default 600
   */
  openDelay: number;
  /**
   * The delay in milliseconds before closing the tooltip when hover/focus ends.
   * @default 0
   */
  closeDelay: number;
}
/**
 * @internal
 */
declare const TooltipTriggerPropsDeclaration: Readonly<{
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
  openDelay: import("@aria-ui/core").PropDeclaration<number>;
  closeDelay: import("@aria-ui/core").PropDeclaration<number>;
}>;
/**
 * @internal
 */
declare function setupTooltipTrigger(host: HostElement, props: State<TooltipTriggerProps>): void;
declare const TooltipTriggerElement_base: import("@aria-ui/core").HostElementConstructor<TooltipTriggerProps>;
/**
 * `<aria-ui-tooltip-trigger>` custom element.
 *
 * Properties: {@link TooltipTriggerProps}
 */
declare class TooltipTriggerElement extends TooltipTriggerElement_base {}
/**
 * @internal
 */
declare function registerTooltipTriggerElement(): void;
//#endregion
export { TooltipPopupElement as _, setupTooltipTrigger as a, registerTooltipPopupElement as b, TooltipRootProps as c, setupTooltipRoot as d, TooltipPositionerElement as f, setupTooltipPositioner as g, registerTooltipPositionerElement as h, registerTooltipTriggerElement as i, TooltipRootPropsDeclaration as l, TooltipPositionerPropsDeclaration as m, TooltipTriggerProps as n, TooltipRootElement as o, TooltipPositionerProps as p, TooltipTriggerPropsDeclaration as r, TooltipRootEvents as s, TooltipTriggerElement as t, registerTooltipRootElement as u, TooltipPopupProps as v, setupTooltipPopup as x, TooltipPopupPropsDeclaration as y };
//# sourceMappingURL=tooltip-trigger-BUT7xnOd.d.ts.map