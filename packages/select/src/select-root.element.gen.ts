import { defineCustomElement } from "@aria-ui/core"

import { useSelectRoot } from "./select-root.setup"
import { selectRootEvents, selectRootProps, type SelectRootEvents, type SelectRootProps } from "./select-root.types"

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
