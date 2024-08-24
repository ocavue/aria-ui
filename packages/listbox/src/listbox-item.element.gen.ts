import { ElementBuilder } from "@aria-ui/core"

import { listboxItemProps, type ListboxItemProps } from "./listbox-item.props"
import { useListboxItem } from "./listbox-item.state"

/**
 * A custom ListboxItem element.
 *
 * @group ListboxItem
 */
export class ListboxItemElement extends ElementBuilder<ListboxItemProps>(
  useListboxItem,
  listboxItemProps,
) {}
