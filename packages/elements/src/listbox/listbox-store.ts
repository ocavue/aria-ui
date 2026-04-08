import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import { Collection } from '@aria-ui/utils'

export type ItemFilter = (options: { value: string; query: string }) => boolean

export interface ListboxStore {
  selectedValues: Signal<string[]>
  getQuery: () => string
  getFilter: () => ItemFilter | null
  getMultiple: () => boolean
  emitSelectionChange: (values: string[]) => void
  getHighlightedValue: () => string | null
  setHighlightedValue: (value: string | null) => void
  getCollection: () => Collection
  setCollection: (value: Collection) => void
}

export function createListboxStore(
  getQuery: () => string,
  getFilter: () => ItemFilter | null,
  getMultiple: () => boolean,
  emitSelectionChange: (values: string[]) => void,
): ListboxStore {
  const selectedValues = createSignal<string[]>([])

  const highlightedValue = createSignal<string | null>(null)
  const collection = createSignal<Collection>(new Collection([]))

  const getHighlightedValue = highlightedValue.get
  const setHighlightedValue = highlightedValue.set
  const getCollection = collection.get
  const setCollection = collection.set

  return {
    selectedValues,
    getQuery,
    getFilter,
    getMultiple,
    emitSelectionChange,
    getHighlightedValue,
    setHighlightedValue,
    getCollection,
    setCollection,
  }
}

export const ListboxStoreContext: Context<ListboxStore> =
  createContext<ListboxStore>('ListboxStoreContext')
