import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultListboxItemProps, type ListboxItemProps } from "./listbox-item.props"

const context = createContext<Partial<ListboxItemProps>>("ListboxItem", {})

/**
 * @internal
 */
export function useListboxItemProps(
  element: ConnectableElement,
  props?: Partial<ListboxItemProps>,
): SingalState<ListboxItemProps> {
  return useProps(element, context, defaultListboxItemProps, props)
}

/**
 * Set the props for the child ListboxItem elements.
 * 
 * @internal
 *
 * @group ListboxItem
 */
export function useListboxItemPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<ListboxItemProps>>,
): void {
  usePropsProvider<ListboxItemProps>(element, context, state)
}
