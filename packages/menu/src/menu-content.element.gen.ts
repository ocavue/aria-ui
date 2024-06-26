import { ElementBuilder } from "@aria-ui/core"

import { defaultMenuContentProps, type MenuContentProps } from "./menu-content.props"
import { useMenuContent } from "./menu-content.state"

/**
 * A custom MenuContent element.
 *
 * @group MenuContent
 */
export class MenuContentElement extends ElementBuilder<MenuContentProps>(
  useMenuContent,
  defaultMenuContentProps,
) {}
