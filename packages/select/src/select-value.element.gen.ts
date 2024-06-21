import { ElementBuilder } from "@aria-ui/core"

import { defaultSelectValueProps, type SelectValueProps } from "./select-value.props"
import { useSelectValue } from "./select-value.state"

/**
 * A custom SelectValue element.
 *
 * @group SelectValue
 */
export class SelectValueElement extends ElementBuilder<SelectValueProps>(
  useSelectValue,
  defaultSelectValueProps,
) {}
