import { ElementBuilder } from "@aria-ui/core"

import { defaultSelectContentProps, type SelectContentProps } from "./select-content.props"
import { useSelectContent } from "./select-content.state"

/**
 * A custom SelectContent element.
 *
 * @group SelectContent
 */
export class SelectContentElement extends ElementBuilder<SelectContentProps>(
  useSelectContent,
  defaultSelectContentProps,
) {}
