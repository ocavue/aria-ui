import { defineCustomElement } from "@aria-ui/core"

import { useMenuContent } from "./menu-content.setup"
import {
  menuContentEvents,
  menuContentProps,
  type MenuContentEvents,
  type MenuContentProps,
} from "./menu-content.types"
import { useMenuItem } from "./menu-item.setup"
import {
  menuItemEvents,
  menuItemProps,
  type MenuItemEvents,
  type MenuItemProps,
} from "./menu-item.types"
import { useMenuRoot } from "./menu-root.setup"
import {
  menuRootEvents,
  menuRootProps,
  type MenuRootEvents,
  type MenuRootProps,
} from "./menu-root.types"
import { useMenuTrigger } from "./menu-trigger.setup"
import {
  menuTriggerEvents,
  menuTriggerProps,
  type MenuTriggerEvents,
  type MenuTriggerProps,
} from "./menu-trigger.types"

/**
 * A custom MenuContent element.
 *
 * @group MenuContent
 */
export class MenuContentElement extends defineCustomElement<
  MenuContentProps,
  MenuContentEvents
>({
  props: menuContentProps,
  events: menuContentEvents,
  setup: useMenuContent,
}) {}

/**
 * A custom MenuItem element.
 *
 * @group MenuItem
 */
export class MenuItemElement extends defineCustomElement<
  MenuItemProps,
  MenuItemEvents
>({
  props: menuItemProps,
  events: menuItemEvents,
  setup: useMenuItem,
}) {}

/**
 * A custom MenuRoot element.
 *
 * @group MenuRoot
 */
export class MenuRootElement extends defineCustomElement<
  MenuRootProps,
  MenuRootEvents
>({
  props: menuRootProps,
  events: menuRootEvents,
  setup: useMenuRoot,
}) {}

/**
 * A custom MenuTrigger element.
 *
 * @group MenuTrigger
 */
export class MenuTriggerElement extends defineCustomElement<
  MenuTriggerProps,
  MenuTriggerEvents
>({
  props: menuTriggerProps,
  events: menuTriggerEvents,
  setup: useMenuTrigger,
}) {}

export * from "./menu-content.types"
export * from "./menu-content.setup"
export * from "./menu-item.types"
export * from "./menu-item.setup"
export * from "./menu-root.types"
export * from "./menu-root.setup"
export * from "./menu-trigger.types"
export * from "./menu-trigger.setup"
