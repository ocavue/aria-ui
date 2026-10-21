import { HostElement, PropsDeclaration, State } from "@aria-ui/core";
import { AutoUpdateOptions, Boundary, ElementContext, OffsetOptions, Placement, ReferenceElement, RootBoundary } from "@floating-ui/dom";
//#region src/overlay/open-change-event.d.ts
declare class OpenChangeEvent extends Event {
  /**
   * Whether the overlay is open.
   */
  readonly detail: boolean;
  constructor(open: boolean);
}
//#endregion
//#region src/overlay/overlay-store.d.ts
interface OverlayStore {
  getIsOpen(): boolean;
  getIsHidden(): boolean;
  setIsHidden(hidden: boolean): void;
  requestOpenChange(open: boolean): void;
  requestOpenToggle(): void;
  getPositionerId(): string;
  setPositionerId(id: string): void;
  getPopupId(): string;
  setPopupId(id: string): void;
  getAnchorElement(): ReferenceElement | undefined;
  setAnchorElement(element: ReferenceElement | undefined): void;
}
declare function createOverlayStore(getOpen: () => boolean | null, setOpen: (open: boolean) => void, getDefaultOpen: () => boolean, getDisabled: () => boolean, dispatchOpenChangeEvent: (event: OpenChangeEvent) => void): OverlayStore;
//#endregion
//#region src/overlay/overlay-positioner.d.ts
interface OverlayPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy: 'absolute' | 'fixed';
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: Placement;
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate: boolean | AutoUpdateOptions;
  /**
   * Whether to use the browser Popover API to place the floating element on
   * top of other page content.
   *
   * @default true
   */
  hoist: boolean;
  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset: OffsetOptions;
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip: boolean | Placement[];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift: boolean;
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap: boolean;
  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport: boolean;
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth: boolean;
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight: boolean;
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline: boolean;
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide: boolean;
  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary: Boundary;
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary: RootBoundary;
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding: number;
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext: ElementContext;
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary: boolean;
}
/**
 * @internal
 */
declare const OverlayPositionerPropsDeclaration: Readonly<{
  strategy: import("@aria-ui/core").PropDeclaration<"absolute" | "fixed">;
  placement: import("@aria-ui/core").PropDeclaration<Placement>;
  autoUpdate: import("@aria-ui/core").PropDeclaration<boolean | AutoUpdateOptions>;
  hoist: import("@aria-ui/core").PropDeclaration<boolean>;
  offset: import("@aria-ui/core").PropDeclaration<OffsetOptions>;
  flip: import("@aria-ui/core").PropDeclaration<boolean | Placement[]>;
  shift: import("@aria-ui/core").PropDeclaration<boolean>;
  overlap: import("@aria-ui/core").PropDeclaration<boolean>;
  fitViewport: import("@aria-ui/core").PropDeclaration<boolean>;
  sameWidth: import("@aria-ui/core").PropDeclaration<boolean>;
  sameHeight: import("@aria-ui/core").PropDeclaration<boolean>;
  inline: import("@aria-ui/core").PropDeclaration<boolean>;
  hide: import("@aria-ui/core").PropDeclaration<boolean>;
  boundary: import("@aria-ui/core").PropDeclaration<Boundary>;
  rootBoundary: import("@aria-ui/core").PropDeclaration<RootBoundary>;
  overflowPadding: import("@aria-ui/core").PropDeclaration<number>;
  elementContext: import("@aria-ui/core").PropDeclaration<ElementContext>;
  altBoundary: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
/**
 * @internal
 */
declare function setupOverlayPositioner(host: HostElement, props: State<OverlayPositionerProps>, getStore: () => OverlayStore | undefined): void;
//#endregion
//#region src/overlay/overlay-root.d.ts
interface OverlayRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen: boolean;
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open: boolean | null;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean;
}
/**
 * @internal
 */
declare const OverlayRootPropsDeclaration: PropsDeclaration<OverlayRootProps>;
/**
 * @internal
 */
declare function useOverlayStore(host: HostElement, props: State<OverlayRootProps>): OverlayStore;
//#endregion
export { OverlayPositionerPropsDeclaration as a, createOverlayStore as c, OverlayPositionerProps as i, OpenChangeEvent as l, OverlayRootPropsDeclaration as n, setupOverlayPositioner as o, useOverlayStore as r, OverlayStore as s, OverlayRootProps as t };
//# sourceMappingURL=overlay-root-6Xic5pRI.d.ts.map