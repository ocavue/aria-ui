import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import { Collection } from '@aria-ui/utils'

export type ItemFilter = (options: { value: string; query: string }) => boolean

export class ListboxStore {
  readonly selectedValues: Signal<string[]>
  readonly getMultiple: () => boolean
  readonly getQuery: () => string
  readonly getFilter: () => ItemFilter | null
  readonly emitSelectionChange: (values: string[]) => void

  getHighlightedValue: () => string | null
  setHighlightedValue: (value: string | null) => void
  getCollection: () => Collection
  setCollection: (collection: Collection) => void

  constructor(
    getQuery: () => string,
    getFilter: () => ItemFilter | null,
    getMultiple: () => boolean, 
    emitSelectionChange: (values: string[]) => void) {
    this.selectedValues = createSignal<string[]>([])
    this.getQuery = getQuery
    this.getFilter = getFilter
    this.getMultiple = getMultiple
    this.emitSelectionChange = emitSelectionChange
    
    const highlightedValue = createSignal<string | null>(null)
    const collection = createSignal<Collection>(new Collection([]))

    this.getHighlightedValue = highlightedValue.get
    this.setHighlightedValue = highlightedValue.set
    this.getCollection = collection.get
    this.setCollection = collection.set
  }
}

export const ListboxStoreContext: Context<ListboxStore> =
  createContext<ListboxStore>('ListboxStoreContext')
