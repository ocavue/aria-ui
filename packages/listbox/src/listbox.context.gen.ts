import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultListboxProps, type ListboxProps } from "./listbox.props"

const context = createContext<Partial<ListboxProps>>("Listbox", {})

/**
 * @internal
 */
export function useListboxProps(
  element: ConnectableElement,
  props?: Partial<ListboxProps>,
): SingalState<ListboxProps> {
  return useProps(element, context, defaultListboxProps, props)
}

/**
 * Set the props for the child Listbox elements.
 * 
 * @internal
 *
 * @group Listbox
 */
export function useListboxPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<ListboxProps>>,
): void {
  usePropsProvider<ListboxProps>(element, context, state)
}
