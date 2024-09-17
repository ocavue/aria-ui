import { defineCustomElement } from "@aria-ui/core"

import { useMenuItem } from "./menu-item.setup"
import { menuItemEvents, menuItemProps, type MenuItemEvents, type MenuItemProps } from "./menu-item.types"

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
