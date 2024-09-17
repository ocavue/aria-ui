import { defineCustomElement } from "@aria-ui/core"

import { useMenuContent } from "./menu-content.setup"
import { menuContentEvents, menuContentProps, type MenuContentEvents, type MenuContentProps } from "./menu-content.types"

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
