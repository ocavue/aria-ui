import { ElementMixin } from "@aria-ui/core"

import { defaultSelectValueProps, type SelectValueProps } from "./select-value.props"
import { useSelectValue } from "./select-value.state"

/**
 * A custom SelectValue element.
 *
 * @group SelectValue
 */
export class SelectValueElement extends ElementMixin<SelectValueProps>(
  useSelectValue,
  defaultSelectValueProps,
) {}
