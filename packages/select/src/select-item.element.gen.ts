import { ElementBuilder } from "@aria-ui/core"

import { selectItemProps, type SelectItemProps } from "./select-item.props"
import { useSelectItem } from "./select-item.state"

/**
 * A custom SelectItem element.
 *
 * @group SelectItem
 */
export class SelectItemElement extends ElementBuilder<SelectItemProps>(
  useSelectItem,
  selectItemProps,
) {}
