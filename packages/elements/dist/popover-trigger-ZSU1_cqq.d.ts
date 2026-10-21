import { i as OverlayPositionerProps, l as OpenChangeEvent, t as OverlayRootProps } from "./overlay-root-6Xic5pRI.js";
import { t as OverlayPopupProps } from "./overlay-popup-Rm7Bvix7.js";
import { HostElement, State } from "@aria-ui/core";
//#region src/popover/popover-popup.d.ts
interface PopoverPopupProps extends OverlayPopupProps {}
/**
 * @internal
 */
declare const PopoverPopupPropsDeclaration: Readonly<{}>;
/**
 * @internal
 */
declare function setupPopoverPopup(host: HostElement, _props: State<PopoverPopupProps>): void;
declare const PopoverPopupElement_base: import("@aria-ui/core").HostElementConstructor<PopoverPopupProps>;
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
declare class PopoverPopupElement extends PopoverPopupElement_base {}
/**
 * @internal
 */
declare function registerPopoverPopupElement(): void;
//#endregion
//#region src/popover/popover-positioner.d.ts
interface PopoverPositionerProps extends OverlayPositionerProps {}
/**
 * @internal
 */
declare const PopoverPositionerPropsDeclaration: Readonly<{
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
declare function setupPopoverPositioner(host: HostElement, props: State<PopoverPositionerProps>): void;
declare const PopoverPositionerElement_base: import("@aria-ui/core").HostElementConstructor<PopoverPositionerProps>;
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
declare class PopoverPositionerElement extends PopoverPositionerElement_base {}
/**
 * @internal
 */
declare function registerPopoverPositionerElement(): void;
//#endregion
//#region src/popover/popover-root.d.ts
interface PopoverRootProps extends OverlayRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal: boolean;
}
/**
 * @internal
 */
declare const PopoverRootPropsDeclaration: Readonly<{
  modal: import("@aria-ui/core").PropDeclaration<boolean>;
  defaultOpen: import("@aria-ui/core").PropDeclaration<boolean>;
  open: import("@aria-ui/core").PropDeclaration<boolean | null>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
interface PopoverRootEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent;
}
/**
 * @internal
 */
declare function setupPopoverRoot(host: HostElement, props: State<PopoverRootProps>): void;
declare const PopoverRootElement_base: import("@aria-ui/core").HostElementConstructor<PopoverRootProps>;
/**
 * `<aria-ui-popover-root>` custom element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * Events: {@link PopoverRootEvents}
 */
declare class PopoverRootElement extends PopoverRootElement_base {}
/**
 * @internal
 */
declare function registerPopoverRootElement(): void;
//#endregion
//#region src/popover/popover-trigger.d.ts
interface PopoverTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean;
  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover: boolean;
  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay: number;
  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay: number;
}
/**
 * @internal
 */
declare const PopoverTriggerPropsDeclaration: Readonly<{
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
  openOnHover: import("@aria-ui/core").PropDeclaration<boolean>;
  delay: import("@aria-ui/core").PropDeclaration<number>;
  closeDelay: import("@aria-ui/core").PropDeclaration<number>;
}>;
interface PopoverTriggerEvents {
  /**
   * Emitted when the popover is opened or closed.
   */
  openChange: OpenChangeEvent;
}
/**
 * @internal
 */
declare function setupPopoverTrigger(host: HostElement, props: State<PopoverTriggerProps>): void;
declare const PopoverTriggerElement_base: import("@aria-ui/core").HostElementConstructor<PopoverTriggerProps>;
/**
 * `<aria-ui-popover-trigger>` custom element.
 *
 * Properties: {@link PopoverTriggerProps}
 *
 * Events: {@link PopoverTriggerEvents}
 */
declare class PopoverTriggerElement extends PopoverTriggerElement_base {}
/**
 * @internal
 */
declare function registerPopoverTriggerElement(): void;
//#endregion
export { setupPopoverPopup as S, setupPopoverPositioner as _, registerPopoverTriggerElement as a, PopoverPopupPropsDeclaration as b, PopoverRootEvents as c, registerPopoverRootElement as d, setupPopoverRoot as f, registerPopoverPositionerElement as g, PopoverPositionerPropsDeclaration as h, PopoverTriggerPropsDeclaration as i, PopoverRootProps as l, PopoverPositionerProps as m, PopoverTriggerEvents as n, setupPopoverTrigger as o, PopoverPositionerElement as p, PopoverTriggerProps as r, PopoverRootElement as s, PopoverTriggerElement as t, PopoverRootPropsDeclaration as u, PopoverPopupElement as v, registerPopoverPopupElement as x, PopoverPopupProps as y };
//# sourceMappingURL=popover-trigger-ZSU1_cqq.d.ts.map