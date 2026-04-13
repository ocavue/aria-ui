import type { HostElement } from '@aria-ui/core'
import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type State,
} from '@aria-ui/core'
import {
  handleCollectionNavigation,
  useAriaActivedescendant,
  useAriaDisabled,
  useAriaMultiselectable,
  useAriaOrientation,
  useEventListener,
} from '@aria-ui/utils'

import { createListboxStore, ListboxStoreContext, type ItemFilter } from './listbox-store.ts'

export type { ItemFilter }

/**
 * A simple case-insensitive substring match filter.
 */
export const defaultItemFilter: ItemFilter = ({ value, query }) => {
  if (!query) {
    return true
  }

  return value
    .toLowerCase()
    .replaceAll(/\s/g, '')
    .includes(query.toLowerCase().replaceAll(/\s/g, ''))
}

export interface ListboxRootProps {
  /**
   * The currently selected value. Only available when {@link multiple} is
   * false, or the empty string if no options are selected.
   *
   * @default ''
   */
  value: string

  /**
   * The currently selected values. Only available when {@link multiple} is
   * true.
   *
   * @default []
   */
  values: string[]

  /**
   * Whether multiple selection is enabled.
   *
   * @default false
   */
  multiple: boolean

  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean

  /**
   * The orientation of the listbox, affects which arrow keys are used for
   * navigation.
   *
   * @default "vertical"
   */
  orientation: 'vertical' | 'horizontal'

  /**
   * Whether keyboard navigation wraps from last to first and vice versa.
   *
   * @default false
   */
  loop: boolean

  /**
   * Whether the listbox should automatically highlight the first item when
   * the listbox is mounted or when the query changes.
   *
   * @default false
   */
  autoHighlight: boolean

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string

  /**
   * The filter function to determine if an item should be shown in the
   * listbox. By default, a simple case-insensitive substring match is used.
   * You can provide a custom filter function to match against a more complex
   * pattern. You can also pass `null` to disable filtering and allow all items
   * to be shown.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null

  /**
   * By default, the Listbox element will listen for keydown events. You can
   * pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | EventTarget | null
}

/**
 * @internal
 */
export const ListboxRootPropsDeclaration = defineProps<ListboxRootProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  values: { default: [], attribute: 'values', type: 'json' },
  multiple: { default: false, attribute: 'multiple', type: 'boolean' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
  orientation: {
    default: 'vertical',
    attribute: 'orientation',
    type: 'string',
  },
  loop: { default: false, attribute: 'loop', type: 'boolean' },
  autoHighlight: { default: false, attribute: 'auto-highlight', type: 'boolean' },
  query: { default: '', attribute: 'query', type: 'string' },
  filter: { default: defaultItemFilter, attribute: false },
  eventTarget: { default: null, attribute: false },
})

export class ValueChangeEvent extends Event {
  /**
   * The newly selected value.
   */
  readonly detail: string

  constructor(value: string) {
    super('valueChange', { bubbles: true, cancelable: true })
    this.detail = value
  }
}

export class ValuesChangeEvent extends Event {
  /**
   * The newly selected values.
   */
  readonly detail: string[]

  constructor(values: string[]) {
    super('valuesChange', { bubbles: true, cancelable: true })
    this.detail = values
  }
}

declare global {
  interface HTMLElementEventMap {
    valuesChange: ValuesChangeEvent
    valueChange: ValueChangeEvent
  }
}

export interface ListboxRootEvents {
  /**
   * Emitted when the selected value changes. Only available when multiple is
   * false.
   */
  valueChange: ValueChangeEvent

  /**
   * Emitted when the selected values change. Only available when multiple is
   * true.
   */
  valuesChange: ValuesChangeEvent
}

/**
 * @internal
 */
export function setupListboxRoot(host: HostElement, props: State<ListboxRootProps>) {
  const { disabled, multiple, query, filter, orientation, autoHighlight, values, value } = props

  onMount(host, () => {
    host.role = 'listbox'
    // Include the listbox in the page tab sequence. DOM focus stays on the
    // listbox container while `aria-activedescendant` tracks the highlighted
    // option (see `useAriaActivedescendant` below).
    //
    // Per WAI-ARIA APG Listbox pattern:
    //   tabindex="0" — "Includes the listbox in the page tab sequence."
    //   aria-activedescendant — "DOM focus remains on the listbox element."
    // https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/
    host.tabIndex = 0
  })

  const emitSelectionChange = (selectionValues: string[]) => {
    if (disabled.get()) return

    if (multiple.get()) {
      const event = new ValuesChangeEvent(selectionValues)
      host.dispatchEvent(event)
      if (event.defaultPrevented) return
      values.set(selectionValues)
    } else {
      const singleValue = selectionValues[0] ?? ''
      const event = new ValueChangeEvent(singleValue)
      host.dispatchEvent(event)
      if (event.defaultPrevented) return
      value.set(singleValue)
    }
  }

  const store = createListboxStore(query.get, filter.get, multiple.get, emitSelectionChange)
  ListboxStoreContext.provide(host, store)

  useEffect(host, () => {
    if (multiple.get()) {
      store.selectedValues.set(values.get())
    } else {
      const v = value.get()
      store.selectedValues.set(v ? [v] : [])
    }
  })

  useAriaMultiselectable(host, multiple.get)
  useAriaOrientation(host, orientation.get)
  useAriaDisabled(host, disabled.get)
  useAriaActivedescendant(host, () => {
    const highlightedValue = store.getHighlightedValue()
    if (highlightedValue == null) return undefined
    const element = store.getCollection().getElement(highlightedValue)
    return element?.id
  })

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.defaultPrevented) return
    if (disabled.get()) return

    if (
      handleCollectionNavigation(
        event,
        store.getCollection(),
        store.getHighlightedValue,
        store.setHighlightedValue,
        orientation.get(),
      )
    ) {
      updateScroll()
      return
    }

    switch (event.key) {
      case ' ':
      case 'Enter': {
        const currentValue = store.getHighlightedValue()
        if (currentValue == null) return
        const currentItem = store.getCollection().getElement(currentValue)
        if (currentItem == null) return
        event.preventDefault()
        currentItem.click()
      }
    }
  }

  useEffect(host, () => {
    const abortController = new AbortController()
    const target: HTMLElement | EventTarget = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener, {
      signal: abortController.signal,
    })
    return () => {
      abortController.abort()
    }
  })

  useEventListener(host, 'focus', () => {
    if (store.getHighlightedValue() != null) return
    const collection = store.getCollection()
    if (collection.size() === 0) return
    const selectedValues = store.selectedValues.get()
    const firstSelected = selectedValues.find((v) => collection.getElement(v) != null)
    store.setHighlightedValue(firstSelected ?? collection.first())
  })

  useEffect(host, () => {
    // Clear the highlighted value whenever the listbox becomes `disabled`.
    if (disabled.get()) {
      store.setHighlightedValue(undefined)
    }
  })

  // Highlight the first item on mount and whenever the query changes
  useEffect(host, () => {
    // Auto-highlight the first item on mount and whenever the query changes,
    // so the user can press Enter immediately to select it.
    if (!autoHighlight.get() || disabled.get()) return
    query.get()
    const firstValue = store.getCollection().first()
    if (firstValue == null) return
    store.setHighlightedValue(firstValue)
    // Use `queueMicrotask` to untrack the current reactive scope
    queueMicrotask(updateScroll)
  })

  const updateScroll = () => {
    const highlightedValue = store.getHighlightedValue()
    if (highlightedValue == null) return
    const element = store.getCollection().getElement(highlightedValue)
    if (!element) return
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }
}

/**
 * `<aria-ui-listbox-root>` custom element.
 *
 * Properties: {@link ListboxRootProps}
 *
 * Events: {@link ListboxRootEvents}
 */
export class ListboxRootElement extends defineCustomElement(
  setupListboxRoot,
  ListboxRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerListboxRootElement(): void {
  registerCustomElement('aria-ui-listbox-root', ListboxRootElement)
}
