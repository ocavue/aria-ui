import { ElementBuilder } from "@aria-ui/core"

import { menuItemProps, type MenuItemProps } from "./menu-item.props"
import { useMenuItem } from "./menu-item.state"

/**
 * A custom MenuItem element.
 *
 * @group MenuItem
 */
export class MenuItemElement extends ElementBuilder<MenuItemProps>(
  useMenuItem,
  menuItemProps,
) {}
