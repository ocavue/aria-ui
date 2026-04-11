import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'

import { ListboxStoreContext } from './listbox-store.ts'

export interface ListboxEmptyProps {}

/**
 * @internal
 */
export const ListboxEmptyPropsDeclaration = defineProps<ListboxEmptyProps>({})

/**
 * @internal
 */
export function setupListboxEmpty(host: HostElement, _props: State<ListboxEmptyProps>) {
  const getStore = ListboxStoreContext.consume(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const hasItems = store.getCollection().size() > 0
    host.style.display = hasItems ? 'none' : ''
  })
}

/**
 * `<aria-ui-listbox-empty>` custom element.
 *
 * Properties: {@link ListboxEmptyProps}
 */
export class ListboxEmptyElement extends defineCustomElement(
  setupListboxEmpty,
  ListboxEmptyPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerListboxEmptyElement(): void {
  registerCustomElement('aria-ui-listbox-empty', ListboxEmptyElement)
}
