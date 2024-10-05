import { defineCustomElement } from "@aria-ui/core"

import { useComboboxEmpty } from "./combobox-empty.setup"
import {
  comboboxEmptyEvents,
  comboboxEmptyProps,
  type ComboboxEmptyEvents,
  type ComboboxEmptyProps,
} from "./combobox-empty.types"
import { useComboboxItem } from "./combobox-item.setup"
import {
  comboboxItemEvents,
  comboboxItemProps,
  type ComboboxItemEvents,
  type ComboboxItemProps,
} from "./combobox-item.types"
import { useComboboxList } from "./combobox-list.setup"
import {
  comboboxListEvents,
  comboboxListProps,
  type ComboboxListEvents,
  type ComboboxListProps,
} from "./combobox-list.types"
import { useComboboxRoot } from "./combobox-root.setup"
import {
  comboboxRootEvents,
  comboboxRootProps,
  type ComboboxRootEvents,
  type ComboboxRootProps,
} from "./combobox-root.types"

/**
 * A custom ComboboxEmpty element.
 *
 * @group ComboboxEmpty
 */
export class ComboboxEmptyElement extends defineCustomElement<
  ComboboxEmptyProps,
  ComboboxEmptyEvents
>({
  props: comboboxEmptyProps,
  events: comboboxEmptyEvents,
  setup: useComboboxEmpty,
}) {}

/**
 * A custom ComboboxItem element.
 *
 * @group ComboboxItem
 */
export class ComboboxItemElement extends defineCustomElement<
  ComboboxItemProps,
  ComboboxItemEvents
>({
  props: comboboxItemProps,
  events: comboboxItemEvents,
  setup: useComboboxItem,
}) {}

/**
 * A custom ComboboxList element.
 *
 * @group ComboboxList
 */
export class ComboboxListElement extends defineCustomElement<
  ComboboxListProps,
  ComboboxListEvents
>({
  props: comboboxListProps,
  events: comboboxListEvents,
  setup: useComboboxList,
}) {}

/**
 * A custom ComboboxRoot element.
 *
 * @group ComboboxRoot
 */
export class ComboboxRootElement extends defineCustomElement<
  ComboboxRootProps,
  ComboboxRootEvents
>({
  props: comboboxRootProps,
  events: comboboxRootEvents,
  setup: useComboboxRoot,
}) {}

export * from "./combobox-empty.types"
export * from "./combobox-empty.setup"
export * from "./combobox-item.types"
export * from "./combobox-item.setup"
export * from "./combobox-list.types"
export * from "./combobox-list.setup"
export * from "./combobox-root.types"
export * from "./combobox-root.setup"
