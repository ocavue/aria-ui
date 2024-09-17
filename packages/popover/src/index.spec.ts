import { within } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { html, render, type TemplateResult } from "lit-html"
import { describe, expect, it, vi } from "vitest"

import type { PopoverRootElement } from "./elements"

import "./index"

describe("Popover", () => {
  it("should render popover", () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-popover-root data-testid="root">
        <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
        <aria-ui-popover-content data-testid="content">Content</aria-ui-popover-content>
      </aria-ui-popover-root>
    `)

    expect(screen.getByTestId("root")).toBeVisible()
    expect(screen.getByTestId("trigger")).toBeVisible()
    expect(screen.getByTestId("content")).not.toBeVisible()
  })

  it("should toggle the visibility by clicking on trigger", async () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-popover-root data-testid="root">
        <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
        <aria-ui-popover-content data-testid="content">Content</aria-ui-popover-content>
      </aria-ui-popover-root>
    `)

    const trigger = screen.getByTestId("trigger")
    const content = screen.getByTestId("content")

    expect(content).not.toBeVisible()

    await userEvent.click(trigger)
    expect(content).toBeVisible()

    await userEvent.click(trigger)
    expect(content).not.toBeVisible()
  })

  it("should toggle the visibility by setting open property", () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-popover-root data-testid="root">
        <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
        <aria-ui-popover-content data-testid="content">Content</aria-ui-popover-content>
      </aria-ui-popover-root>
    `)

    const root = screen.getByTestId<PopoverRootElement>("root")
    const content = screen.getByTestId("content")

    expect(content).not.toBeVisible()

    root.open = true
    expect(content).toBeVisible()

    root.open = false
    expect(content).not.toBeVisible()
  })

  it("should emit event when the open state is changed by user", async () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-popover-root data-testid="root">
        <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
        <aria-ui-popover-content data-testid="content">Content</aria-ui-popover-content>
      </aria-ui-popover-root>
    `)

    const root = screen.getByTestId<PopoverRootElement>("root")

    const onOpenChange = vi.fn()
    root.addEventListener("update:open", (e) => {
      const event = e as CustomEvent<boolean>
      onOpenChange(event.detail)
    })

    expect(root.open).toBe(false)
    expect(onOpenChange).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByTestId("trigger"))
    expect(root.open).toBe(true)
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    expect(onOpenChange).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByTestId("trigger"))
    expect(root.open).toBe(false)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })

  it("should not emit event when the open state is changed programatically", () => {
    const { render, screen } = setup()

    render(html`
      <aria-ui-popover-root data-testid="root">
        <aria-ui-popover-trigger data-testid="trigger">Trigger</aria-ui-popover-trigger>
        <aria-ui-popover-content data-testid="content">Content</aria-ui-popover-content>
      </aria-ui-popover-root>
    `)

    const root = screen.getByTestId<PopoverRootElement>("root")

    const onOpenChange = vi.fn()
    root.addEventListener("update:open", (e) => {
      const event = e as CustomEvent<boolean>
      onOpenChange(event.detail)
    })

    expect(root.open).toBe(false)
    expect(onOpenChange).toHaveBeenCalledTimes(0)

    root.open = true
    expect(root.open).toBe(true)
    expect(onOpenChange).toHaveBeenCalledTimes(0)

    root.open = false
    expect(root.open).toBe(false)
    expect(onOpenChange).toHaveBeenCalledTimes(0)
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
