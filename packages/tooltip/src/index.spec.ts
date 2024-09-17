import { within } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { html, render, type TemplateResult } from "lit-html"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import type { TooltipRootElement, TooltipTriggerElement } from "./elements"
import "./index"

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
      <aria-ui-tooltip-root data-testid="root">
        <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
        <aria-ui-tooltip-content data-testid="content">Content</aria-ui-tooltip-content>
      </aria-ui-tooltip-root>
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
      <aria-ui-tooltip-root data-testid="root1">
        <aria-ui-tooltip-trigger data-testid="trigger1">Trigger1</aria-ui-tooltip-trigger>
        <aria-ui-tooltip-content data-testid="content1">Content1</aria-ui-tooltip-content>
      </aria-ui-tooltip-root>
      <aria-ui-tooltip-root data-testid="root2">
        <aria-ui-tooltip-trigger data-testid="trigger2">Trigger2</aria-ui-tooltip-trigger>
        <aria-ui-tooltip-content data-testid="content2">Content2</aria-ui-tooltip-content>
      </aria-ui-tooltip-root>
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

  it("should trigger onOpenChange when the open state changes", async () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-tooltip-root data-testid="root">
        <aria-ui-tooltip-trigger data-testid="trigger">Trigger</aria-ui-tooltip-trigger>
        <aria-ui-tooltip-content data-testid="content">Content</aria-ui-tooltip-content>
      </aria-ui-tooltip-root>
    `)

    const root = screen.getByTestId("root") as TooltipRootElement
    const trigger = screen.getByTestId("trigger") as TooltipTriggerElement

    const onOpenChange = vi.fn()
    root.addEventListener("update:open", (e) => {
      const event = e as CustomEvent<boolean>
      onOpenChange(event.detail)
    })

    expect(onOpenChange).not.toHaveBeenCalled()

    await userEvent.hover(trigger)
    await vi.advanceTimersByTimeAsync(1000)
    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    await userEvent.unhover(trigger)
    await vi.advanceTimersByTimeAsync(1000)
    expect(onOpenChange).toHaveBeenCalledTimes(2)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)

    root.open = true
    await vi.advanceTimersByTimeAsync(1000)
    root.open = false
    await vi.advanceTimersByTimeAsync(1000)
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })
})

function setup() {
  const container = document.createElement("div")
  document.body.appendChild(container)

  const renderHTML = (html: TemplateResult) => {
    render(html, container)
  }

  return { render: renderHTML, container, screen: within(container) }
}
