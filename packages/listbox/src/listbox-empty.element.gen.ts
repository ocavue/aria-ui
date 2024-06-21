import { ElementBuilder } from "@aria-ui/core"

import { defaultListboxEmptyProps, type ListboxEmptyProps } from "./listbox-empty.props"
import { useListboxEmpty } from "./listbox-empty.state"

/**
 * A custom ListboxEmpty element.
 *
 * @group ListboxEmpty
 */
export class ListboxEmptyElement extends ElementBuilder<ListboxEmptyProps>(
  useListboxEmpty,
  defaultListboxEmptyProps,
) {}
