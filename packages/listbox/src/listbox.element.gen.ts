import { ElementBuilder } from "@aria-ui/core"

import { listboxProps, type ListboxProps } from "./listbox.props"
import { useListbox } from "./listbox.state"

/**
 * A custom Listbox element.
 *
 * @group Listbox
 */
export class ListboxElement extends ElementBuilder<ListboxProps>(
  useListbox,
  listboxProps,
) {}
