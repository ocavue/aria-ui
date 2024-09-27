import { defineCustomElement } from "@aria-ui/core"

import { useListboxEmpty } from "./listbox-empty.setup"
import {
  listboxEmptyEvents,
  listboxEmptyProps,
  type ListboxEmptyEvents,
  type ListboxEmptyProps,
} from "./listbox-empty.types"
import { useListboxItem } from "./listbox-item.setup"
import {
  listboxItemEvents,
  listboxItemProps,
  type ListboxItemEvents,
  type ListboxItemProps,
} from "./listbox-item.types"
import { useListbox } from "./listbox.setup"
import {
  listboxEvents,
  listboxProps,
  type ListboxEvents,
  type ListboxProps,
} from "./listbox.types"

/**
 * A custom ListboxEmpty element.
 *
 * @group ListboxEmpty
 */
export class ListboxEmptyElement extends defineCustomElement<
  ListboxEmptyProps,
  ListboxEmptyEvents
>({
  props: listboxEmptyProps,
  events: listboxEmptyEvents,
  setup: useListboxEmpty,
}) {}

/**
 * A custom ListboxItem element.
 *
 * @group ListboxItem
 */
export class ListboxItemElement extends defineCustomElement<
  ListboxItemProps,
  ListboxItemEvents
>({
  props: listboxItemProps,
  events: listboxItemEvents,
  setup: useListboxItem,
}) {}

/**
 * A custom Listbox element.
 *
 * @group Listbox
 */
export class ListboxElement extends defineCustomElement<
  ListboxProps,
  ListboxEvents
>({
  props: listboxProps,
  events: listboxEvents,
  setup: useListbox,
}) {}

export * from "./listbox-empty.types"
export * from "./listbox-empty.setup"
export * from "./listbox-item.types"
export * from "./listbox-item.setup"
export * from "./listbox.types"
export * from "./listbox.setup"
