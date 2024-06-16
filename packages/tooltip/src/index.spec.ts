import { within } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { html, render, type TemplateResult } from "lit-html"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  TooltipContentElement,
  TooltipRootElement,
  TooltipTriggerElement,
} from "./index"

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should show tooltip on hover and hide on leave", async () => {
    const { render, screen } = setup()

    render(html`
      <aria-tooltip-root data-testid="root">
        <aria-tooltip-trigger data-testid="trigger">Trigger</aria-tooltip-trigger>
        <aria-tooltip-content data-testid="content">Content</aria-tooltip-content>
      </aria-tooltip-root>
    `)

    expect(screen.getByTestId("root")).toBeVisible()
    expect(screen.getByTestId("trigger")).toBeVisible()
    expect(screen.getByTestId("content")).not.toBeVisible()

    await userEvent.hover(screen.getByTestId("trigger"))
    await vi.advanceTimersByTimeAsync(1000)
    expect(screen.getByTestId("content")).toBeVisible()

    await userEvent.unhover(screen.getByTestId("trigger"))
    await vi.advanceTimersByTimeAsync(500)
    expect(screen.getByTestId("content")).not.toBeVisible()
  })

  it("should only show one tooltip at a time", async () => {
    const { render, screen } = setup()

    render(html`
      <aria-tooltip-root data-testid="root1">
        <aria-tooltip-trigger data-testid="trigger1">Trigger1</aria-tooltip-trigger>
        <aria-tooltip-content data-testid="content1">Content1</aria-tooltip-content>
      </aria-tooltip-root>
      <aria-tooltip-root data-testid="root2">
        <aria-tooltip-trigger data-testid="trigger2">Trigger2</aria-tooltip-trigger>
        <aria-tooltip-content data-testid="content2">Content2</aria-tooltip-content>
      </aria-tooltip-root>
    `)

    expect(screen.getByTestId("content1")).not.toBeVisible()
    expect(screen.getByTestId("content2")).not.toBeVisible()

    await userEvent.hover(screen.getByTestId("trigger1"))
    await vi.advanceTimersByTimeAsync(100)
    expect(screen.getByTestId("content1")).not.toBeVisible()
    expect(screen.getByTestId("content2")).not.toBeVisible()
    await vi.advanceTimersByTimeAsync(900)
    expect(screen.getByTestId("content1")).toBeVisible()
    expect(screen.getByTestId("content2")).not.toBeVisible()

    await userEvent.unhover(screen.getByTestId("trigger1"))
    await userEvent.hover(screen.getByTestId("trigger2"))
    await vi.advanceTimersByTimeAsync(100)
    expect(screen.getByTestId("content1")).not.toBeVisible()
    expect(screen.getByTestId("content2")).toBeVisible()
  })
})

function setup() {
  defineCustomElement("aria-tooltip-root", TooltipRootElement)
  defineCustomElement("aria-tooltip-trigger", TooltipTriggerElement)
  defineCustomElement("aria-tooltip-content", TooltipContentElement)

  const container = document.createElement("div")
  document.body.appendChild(container)

  const renderHTML = (html: TemplateResult) => {
    render(html, container)
  }

  return { render: renderHTML, container, screen: within(container) }
}

function defineCustomElement(name: string, element: CustomElementConstructor) {
  if (customElements.get(name)) return
  customElements.define(name, element)
}
