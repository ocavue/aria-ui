import { defineCustomElement } from "@aria-ui/core"

import { useMenuRoot } from "./menu-root.setup"
import { menuRootEvents, menuRootProps, type MenuRootEvents, type MenuRootProps } from "./menu-root.types"

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
