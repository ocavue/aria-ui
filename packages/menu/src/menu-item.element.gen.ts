import { ElementBuilder } from "@aria-ui/core"

import { defaultMenuItemProps, type MenuItemProps } from "./menu-item.props"
import { useMenuItem } from "./menu-item.state"

/**
 * A custom MenuItem element.
 *
 * @group MenuItem
 */
export class MenuItemElement extends ElementBuilder<MenuItemProps>(
  useMenuItem,
  defaultMenuItemProps,
) {}
