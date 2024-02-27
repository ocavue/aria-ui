import { BaseElement } from "@aria-ui/core"
import { useTooltipTrigger } from "./tooltip-trigger-state"

/**
 * A custom TooltipTrigger element.
 *
 * @group TooltipTrigger
 */
export class TooltipTriggerElement extends BaseElement {
	constructor() {
		super()
		useTooltipTrigger(this)
	}
}