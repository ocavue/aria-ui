import { t as SelectEvent } from "./index-BGvzXBYK.js";
import { Context, HostElement, State } from "@aria-ui/core";
import { CollectionStore } from "@aria-ui/utils";
//#region src/listbox/listbox-empty.d.ts
interface ListboxEmptyProps {}
/**
 * @internal
 */
declare const ListboxEmptyPropsDeclaration: Readonly<{}>;
/**
 * @internal
 */
declare function setupListboxEmpty(host: HostElement, _props: State<ListboxEmptyProps>): void;
declare const ListboxEmptyElement_base: import("@aria-ui/core").HostElementConstructor<ListboxEmptyProps>;
/**
 * `<aria-ui-listbox-empty>` custom element.
 *
 * Properties: {@link ListboxEmptyProps}
 */
declare class ListboxEmptyElement extends ListboxEmptyElement_base {}
/**
 * @internal
 */
declare function registerListboxEmptyElement(): void;
//#endregion
//#region src/listbox/listbox-item.d.ts
interface ListboxItemProps {
  /**
   * The unique value for this option.
   *
   * @default ""
   */
  value: string;
  /**
   * Whether this option is disabled.
   *
   * @default false
   */
  disabled: boolean;
}
interface ListboxItemEvents {
  /**
   * Emitted when the the item is selected.
   */
  select: SelectEvent;
}
/**
 * @internal
 */
declare const ListboxItemPropsDeclaration: Readonly<{
  value: import("@aria-ui/core").PropDeclaration<string>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
}>;
/**
 * @internal
 */
declare function setupListboxItem(host: HostElement, props: State<ListboxItemProps>): void;
declare const ListboxItemElement_base: import("@aria-ui/core").HostElementConstructor<ListboxItemProps>;
/**
 * `<aria-ui-listbox-item>` custom element.
 *
 * Properties: {@link ListboxItemProps}
 *
 * Events: {@link ListboxItemEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
declare class ListboxItemElement extends ListboxItemElement_base {}
/**
 * @internal
 */
declare function registerListboxItemElement(): void;
//#endregion
//#region src/listbox/listbox-store.d.ts
type ItemFilter = (options: {
  value: string;
  query: string;
}) => boolean;
//#endregion
//#region src/listbox/listbox-root.d.ts
/**
 * A case-insensitive substring filter that ignores whitespace and punctuation,
 * so a query like `#ban` still matches an item valued `banana`.
 */
declare const defaultItemFilter: ItemFilter;
interface ListboxRootProps {
  /**
   * The currently selected value. Only available when {@link multiple} is
   * false, or the empty string if no options are selected.
   *
   * @default ''
   */
  value: string;
  /**
   * The currently selected values. Only available when {@link multiple} is
   * true.
   *
   * @default []
   */
  values: string[];
  /**
   * Whether multiple selection is enabled.
   *
   * @default false
   */
  multiple: boolean;
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean;
  /**
   * The orientation of the listbox, affects which arrow keys are used for
   * navigation.
   *
   * @default "vertical"
   */
  orientation: 'vertical' | 'horizontal';
  /**
   * Whether keyboard navigation wraps from last to first and vice versa.
   *
   * @default false
   */
  loop: boolean;
  /**
   * Whether the listbox should automatically highlight the first item when
   * the listbox is mounted or when the query changes.
   *
   * @default false
   */
  autoHighlight: boolean;
  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string;
  /**
   * The filter function to determine if an item should be shown in the
   * listbox. By default, a simple case-insensitive substring match is used.
   * You can provide a custom filter function to match against a more complex
   * pattern. You can also pass `null` to disable filtering and allow all items
   * to be shown.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null;
  /**
   * By default, the Listbox element will listen for keydown events. You can
   * pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | EventTarget | null;
}
/**
 * @internal
 */
declare const ListboxRootPropsDeclaration: Readonly<{
  value: import("@aria-ui/core").PropDeclaration<string>;
  values: import("@aria-ui/core").PropDeclaration<string[]>;
  multiple: import("@aria-ui/core").PropDeclaration<boolean>;
  disabled: import("@aria-ui/core").PropDeclaration<boolean>;
  orientation: import("@aria-ui/core").PropDeclaration<"vertical" | "horizontal">;
  loop: import("@aria-ui/core").PropDeclaration<boolean>;
  autoHighlight: import("@aria-ui/core").PropDeclaration<boolean>;
  query: import("@aria-ui/core").PropDeclaration<string>;
  filter: import("@aria-ui/core").PropDeclaration<ItemFilter | null>;
  eventTarget: import("@aria-ui/core").PropDeclaration<HTMLElement | EventTarget | null>;
}>;
declare class ValueChangeEvent extends Event {
  /**
   * The newly selected value.
   */
  readonly detail: string;
  constructor(value: string);
}
declare class ValuesChangeEvent extends Event {
  /**
   * The newly selected values.
   */
  readonly detail: string[];
  constructor(values: string[]);
}
declare global {
  interface HTMLElementEventMap {
    valuesChange: ValuesChangeEvent;
    valueChange: ValueChangeEvent;
  }
}
interface ListboxRootEvents {
  /**
   * Emitted when the selected value changes. Only available when multiple is
   * false.
   */
  valueChange: ValueChangeEvent;
  /**
   * Emitted when the selected values change. Only available when multiple is
   * true.
   */
  valuesChange: ValuesChangeEvent;
}
/**
 * @internal
 */
declare function setupListboxRoot(host: HostElement, props: State<ListboxRootProps>): void;
declare const ListboxRootElement_base: import("@aria-ui/core").HostElementConstructor<ListboxRootProps>;
/**
 * `<aria-ui-listbox-root>` custom element.
 *
 * Properties: {@link ListboxRootProps}
 *
 * Events: {@link ListboxRootEvents}
 */
declare class ListboxRootElement extends ListboxRootElement_base {}
/**
 * @internal
 */
declare function registerListboxRootElement(): void;
//#endregion
export { ListboxEmptyElement as _, ValueChangeEvent as a, registerListboxEmptyElement as b, registerListboxRootElement as c, ListboxItemElement as d, ListboxItemEvents as f, setupListboxItem as g, registerListboxItemElement as h, ListboxRootPropsDeclaration as i, setupListboxRoot as l, ListboxItemPropsDeclaration as m, ListboxRootEvents as n, ValuesChangeEvent as o, ListboxItemProps as p, ListboxRootProps as r, defaultItemFilter as s, ListboxRootElement as t, ItemFilter as u, ListboxEmptyProps as v, setupListboxEmpty as x, ListboxEmptyPropsDeclaration as y };
//# sourceMappingURL=listbox-root-B9oRG6my.d.ts.map