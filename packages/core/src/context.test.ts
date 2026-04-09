import { getId } from '@ocavue/utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { createContext } from './context.ts'
import { defineCustomElement } from './define-custom-element.ts'
import { defineProps } from './define-props.ts'
import { HostElement } from './host-element.ts'
import { registerCustomElement } from './register-custom-element.ts'
import type { State } from './store.ts'
import { useEffect } from './use-effect.ts'

describe('Context', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should provide and consume context when elements are created dynamically', () => {
    const ctx = createContext<string>(`test-${getId()}`)
    const providerTag = `test-provider-${getId()}`
    const consumerTag = `test-consumer-${getId()}`

    customElements.define(
      providerTag,
      class extends HostElement {
        constructor() {
          super()
          ctx.provide(this, 'hello')
        }
      },
    )

    customElements.define(
      consumerTag,
      class extends HostElement {
        value: string | undefined
        constructor() {
          super()
          const getValue = ctx.consume(this)
          useEffect(this, () => {
            this.value = getValue()
          })
        }
      },
    )

    const provider = document.createElement(providerTag)
    const consumer = document.createElement(consumerTag) as HostElement & {
      value: string | undefined
    }
    provider.appendChild(consumer)
    document.body.appendChild(provider)

    expect(consumer.value).toBe('hello')
  })

  it('should work with multiple element types pre-rendered via innerHTML', async () => {
    const ctx = createContext<{ getValue: () => string }>(`test-${getId()}`)
    const rootTag = `test-root-${getId()}`
    const childTag = `test-child-${getId()}`
    const leafTag = `test-leaf-${getId()}`

    interface RootProps {
      value: string
    }

    const RootPropsDeclaration = defineProps<RootProps>({
      value: { default: 'default', attribute: 'value', type: 'string' },
    })

    function setupRoot(host: HostElement, props: State<RootProps>) {
      const store = {
        getValue: () => props.value.get(),
      }
      ctx.provide(host, store)
    }

    const RootElement = defineCustomElement(setupRoot, RootPropsDeclaration)

    interface ChildProps {}
    const ChildPropsDeclaration = defineProps<ChildProps>({})

    function setupChild(host: HostElement, _props: State<ChildProps>) {
      const getStore = ctx.consume(host)
      useEffect(host, () => {
        host.dataset.received = getStore()?.getValue() ?? ''
      })
    }

    const ChildElement = defineCustomElement(setupChild, ChildPropsDeclaration)

    interface LeafProps {}
    const LeafPropsDeclaration = defineProps<LeafProps>({})

    function setupLeaf(host: HostElement, _props: State<LeafProps>) {
      const getStore = ctx.consume(host)
      useEffect(host, () => {
        host.dataset.received = getStore()?.getValue() ?? ''
      })
    }

    const LeafElement = defineCustomElement(setupLeaf, LeafPropsDeclaration)

    const container = document.createElement('div')
    container.innerHTML = `
      <${rootTag} value="a">
        <${childTag} data-testid="child1"></${childTag}>
        <${leafTag} data-testid="leaf1"></${leafTag}>
      </${rootTag}>
      <${rootTag} value="b">
        <${childTag} data-testid="child2"></${childTag}>
        <${leafTag} data-testid="leaf2"></${leafTag}>
      </${rootTag}>
    `
    document.body.appendChild(container)

    registerCustomElement(rootTag, RootElement)
    registerCustomElement(childTag, ChildElement)
    registerCustomElement(leafTag, LeafElement)

    await expect.element(page.getByTestId('child1')).toHaveAttribute('data-received', 'a')
    await expect.element(page.getByTestId('leaf1')).toHaveAttribute('data-received', 'a')
    await expect.element(page.getByTestId('child2')).toHaveAttribute('data-received', 'b')
    await expect.element(page.getByTestId('leaf2')).toHaveAttribute('data-received', 'b')
  })
})
