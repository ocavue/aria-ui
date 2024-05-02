import { ElementMixin } from "@aria-ui/core"

import { defaultSelectListProps, type SelectListProps } from "./select-list.props"
import { useSelectList } from "./select-list.state"

/**
 * A custom SelectList element.
 *
 * @group SelectList
 */
export class SelectListElement extends ElementMixin<SelectListProps>(
  useSelectList,
  defaultSelectListProps,
) {}
