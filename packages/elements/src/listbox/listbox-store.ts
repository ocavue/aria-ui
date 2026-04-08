import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import { createCollectionStore, type CollectionStore } from '@aria-ui/utils'

export type ItemFilter = (options: { value: string; query: string }) => boolean

interface ListboxStore extends CollectionStore {
  selectedValues: Signal<string[]>
  getQuery: () => string
  getFilter: () => ItemFilter | null
  getMultiple: () => boolean
  emitSelectionChange: (values: string[]) => void
}

export function createListboxStore(
  getQuery: () => string,
  getFilter: () => ItemFilter | null,
  getMultiple: () => boolean,
  emitSelectionChange: (values: string[]) => void,
): ListboxStore {
  const selectedValues = createSignal<string[]>([])

  return {
    ...createCollectionStore(),
    selectedValues,
    getQuery,
    getFilter,
    getMultiple,
    emitSelectionChange,
  }
}

export const ListboxStoreContext: Context<ListboxStore> =
  createContext<ListboxStore>('ListboxStoreContext')
