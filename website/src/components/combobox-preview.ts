import {
  ComboboxEmptyElement,
  ComboboxItemElement,
  ComboboxListElement,
  ComboboxRootElement,
} from "@aria-ui/combobox"
import {
  PopoverRootElement,
  PopoverContentElement,
  PopoverTriggerElement,
} from "@aria-ui/popover"

customElements.define("aui-combobox-root", ComboboxRootElement)
customElements.define("aui-combobox-list", ComboboxListElement)
customElements.define("aui-combobox-item", ComboboxItemElement)
customElements.define("aui-combobox-empty", ComboboxEmptyElement)
customElements.define("aui-popover-root", PopoverRootElement)
customElements.define("aui-popover-content", PopoverContentElement)
customElements.define("aui-popover-trigger", PopoverTriggerElement)
