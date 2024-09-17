import { defineCustomElement } from "@aria-ui/core"

import { useSelectValue } from "./select-value.setup"
import { selectValueEvents, selectValueProps, type SelectValueEvents, type SelectValueProps } from "./select-value.types"

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
