import { ElementMixin } from "@aria-ui/core"

import { defaultMenuRootProps, type MenuRootProps } from "./menu-root.props"
import { useMenuRoot } from "./menu-root.state"

/**
 * A custom MenuRoot element.
 *
 * @group MenuRoot
 */
export class MenuRootElement extends ElementMixin<MenuRootProps>(
  useMenuRoot,
  defaultMenuRootProps,
) {}
