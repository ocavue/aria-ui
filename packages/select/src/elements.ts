import { defineCustomElement } from "@aria-ui/core"

import { useSelectContent } from "./select-content.setup"
import {
  selectContentEvents,
  selectContentProps,
  type SelectContentEvents,
  type SelectContentProps,
} from "./select-content.types"
import { useSelectItem } from "./select-item.setup"
import {
  selectItemEvents,
  selectItemProps,
  type SelectItemEvents,
  type SelectItemProps,
} from "./select-item.types"
import { useSelectList } from "./select-list.setup"
import {
  selectListEvents,
  selectListProps,
  type SelectListEvents,
  type SelectListProps,
} from "./select-list.types"
import { useSelectRoot } from "./select-root.setup"
import {
  selectRootEvents,
  selectRootProps,
  type SelectRootEvents,
  type SelectRootProps,
} from "./select-root.types"
import { useSelectTrigger } from "./select-trigger.setup"
import {
  selectTriggerEvents,
  selectTriggerProps,
  type SelectTriggerEvents,
  type SelectTriggerProps,
} from "./select-trigger.types"
import { useSelectValue } from "./select-value.setup"
import {
  selectValueEvents,
  selectValueProps,
  type SelectValueEvents,
  type SelectValueProps,
} from "./select-value.types"

/**
 * A custom SelectContent element.
 *
 * @group SelectContent
 */
export class SelectContentElement extends defineCustomElement<
  SelectContentProps,
  SelectContentEvents
>({
  props: selectContentProps,
  events: selectContentEvents,
  setup: useSelectContent,
}) {}

/**
 * A custom SelectItem element.
 *
 * @group SelectItem
 */
export class SelectItemElement extends defineCustomElement<
  SelectItemProps,
  SelectItemEvents
>({
  props: selectItemProps,
  events: selectItemEvents,
  setup: useSelectItem,
}) {}

/**
 * A custom SelectList element.
 *
 * @group SelectList
 */
export class SelectListElement extends defineCustomElement<
  SelectListProps,
  SelectListEvents
>({
  props: selectListProps,
  events: selectListEvents,
  setup: useSelectList,
}) {}

/**
 * A custom SelectRoot element.
 *
 * @group SelectRoot
 */
export class SelectRootElement extends defineCustomElement<
  SelectRootProps,
  SelectRootEvents
>({
  props: selectRootProps,
  events: selectRootEvents,
  setup: useSelectRoot,
}) {}

/**
 * A custom SelectTrigger element.
 *
 * @group SelectTrigger
 */
export class SelectTriggerElement extends defineCustomElement<
  SelectTriggerProps,
  SelectTriggerEvents
>({
  props: selectTriggerProps,
  events: selectTriggerEvents,
  setup: useSelectTrigger,
}) {}

/**
 * A custom SelectValue element.
 *
 * @group SelectValue
 */
export class SelectValueElement extends defineCustomElement<
  SelectValueProps,
  SelectValueEvents
>({
  props: selectValueProps,
  events: selectValueEvents,
  setup: useSelectValue,
}) {}

export * from "./select-content.types"
export * from "./select-content.setup"
export * from "./select-item.types"
export * from "./select-item.setup"
export * from "./select-list.types"
export * from "./select-list.setup"
export * from "./select-root.types"
export * from "./select-root.setup"
export * from "./select-trigger.types"
export * from "./select-trigger.setup"
export * from "./select-value.types"
export * from "./select-value.setup"
