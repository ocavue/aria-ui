import { t as SelectEvent } from "./events-HqWWLGoO.js";
import { computed, createContext, createSignal, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { createCollectionStore, handleCollectionNavigation, setupCollectionItem, useAriaActivedescendant, useAriaDisabled, useAriaMultiselectable, useAriaOrientation, useAriaSelected, useEventListener } from "@aria-ui/utils";
//#region src/listbox/listbox-store.ts
function createListboxStore(getQuery, getFilter, getMultiple, emitSelectionChange) {
	const selectedValues = createSignal([]);
	return {
		...createCollectionStore(),
		selectedValues,
		getQuery,
		getFilter,
		getMultiple,
		emitSelectionChange
	};
}
const ListboxStoreContext = createContext("ListboxStoreContext");
//#endregion
//#region src/listbox/listbox-empty.ts
/**
* @internal
*/
const ListboxEmptyPropsDeclaration = defineProps({});
/**
* @internal
*/
function setupListboxEmpty(host, _props) {
	const getStore = ListboxStoreContext.consume(host);
	useEffect(host, () => {
		const store = getStore();
		if (!store) return;
		const hasItems = store.getCollection().size() > 0;
		host.style.display = hasItems ? "none" : "";
	});
}
/**
* `<aria-ui-listbox-empty>` custom element.
*
* Properties: {@link ListboxEmptyProps}
*/
var ListboxEmptyElement = class extends defineCustomElement(setupListboxEmpty, ListboxEmptyPropsDeclaration) {};
/**
* @internal
*/
function registerListboxEmptyElement() {
	registerCustomElement("aria-ui-listbox-empty", ListboxEmptyElement);
}
//#endregion
//#region src/listbox/listbox-item.ts
/**
* @internal
*/
const ListboxItemPropsDeclaration = defineProps({
	value: {
		default: "",
		attribute: "value",
		type: "string"
	},
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	}
});
/**
* @internal
*/
function setupListboxItem(host, props) {
	onMount(host, () => {
		host.role = "option";
	});
	const getStore = ListboxStoreContext.consume(host);
	const getVisible = computed(() => {
		const store = getStore();
		if (!store) return true;
		const query = store.getQuery();
		const filter = store.getFilter();
		const value = props.value.get();
		return filter ? filter({
			value,
			query
		}) : true;
	});
	setupCollectionItem(host, props, getStore, getVisible);
	useAriaSelected(host, () => {
		const store = getStore();
		if (!store) return false;
		return store.selectedValues.get().includes(props.value.get());
	});
	useEffect(host, () => {
		host.hidden = !getVisible();
	});
	useEventListener(host, "click", () => {
		if (props.disabled.get()) return;
		const store = getStore();
		if (!store) return;
		const value = props.value.get();
		store.setHighlightedValue(value);
		const current = store.selectedValues.get();
		const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
		store.emitSelectionChange(next);
		host.dispatchEvent(new SelectEvent(value));
	});
}
/**
* `<aria-ui-listbox-item>` custom element.
*
* Properties: {@link ListboxItemProps}
*
* Events: {@link ListboxItemEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-highlighted` | Present when the item is the currently highlighted option |
*/
var ListboxItemElement = class extends defineCustomElement(setupListboxItem, ListboxItemPropsDeclaration) {};
/**
* @internal
*/
function registerListboxItemElement() {
	registerCustomElement("aria-ui-listbox-item", ListboxItemElement);
}
//#endregion
//#region src/listbox/listbox-root.ts
/**
* A case-insensitive substring filter that ignores whitespace and punctuation,
* so a query like `#ban` still matches an item valued `banana`.
*/
const defaultItemFilter = ({ value, query }) => {
	const normalizedQuery = normalizeFilterText(query);
	if (!normalizedQuery) return true;
	return normalizeFilterText(value).includes(normalizedQuery);
};
function normalizeFilterText(text) {
	return text.toLowerCase().replaceAll(/[^\p{L}\p{N}]/gu, "");
}
/**
* @internal
*/
const ListboxRootPropsDeclaration = defineProps({
	value: {
		default: "",
		attribute: "value",
		type: "string"
	},
	values: {
		default: [],
		attribute: "values",
		type: "json"
	},
	multiple: {
		default: false,
		attribute: "multiple",
		type: "boolean"
	},
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	},
	orientation: {
		default: "vertical",
		attribute: "orientation",
		type: "string"
	},
	loop: {
		default: false,
		attribute: "loop",
		type: "boolean"
	},
	autoHighlight: {
		default: false,
		attribute: "auto-highlight",
		type: "boolean"
	},
	query: {
		default: "",
		attribute: "query",
		type: "string"
	},
	filter: {
		default: defaultItemFilter,
		attribute: false
	},
	eventTarget: {
		default: null,
		attribute: false
	}
});
var ValueChangeEvent = class extends Event {
	constructor(value) {
		super("valueChange", {
			bubbles: true,
			cancelable: true
		});
		this.detail = value;
	}
};
var ValuesChangeEvent = class extends Event {
	constructor(values) {
		super("valuesChange", {
			bubbles: true,
			cancelable: true
		});
		this.detail = values;
	}
};
/**
* @internal
*/
function setupListboxRoot(host, props) {
	const { disabled, multiple, query, filter, orientation, autoHighlight, values, value } = props;
	onMount(host, () => {
		host.role = "listbox";
		host.tabIndex = 0;
	});
	const emitSelectionChange = (selectionValues) => {
		if (disabled.get()) return;
		if (multiple.get()) {
			const event = new ValuesChangeEvent(selectionValues);
			host.dispatchEvent(event);
			if (event.defaultPrevented) return;
			values.set(selectionValues);
		} else {
			const singleValue = selectionValues[0] ?? "";
			const event = new ValueChangeEvent(singleValue);
			host.dispatchEvent(event);
			if (event.defaultPrevented) return;
			value.set(singleValue);
		}
	};
	const store = createListboxStore(query.get, filter.get, multiple.get, emitSelectionChange);
	ListboxStoreContext.provide(host, store);
	useEffect(host, () => {
		if (multiple.get()) store.selectedValues.set(values.get());
		else {
			const v = value.get();
			store.selectedValues.set(v ? [v] : []);
		}
	});
	useAriaMultiselectable(host, multiple.get);
	useAriaOrientation(host, orientation.get);
	useAriaDisabled(host, disabled.get);
	useAriaActivedescendant(host, () => {
		const highlightedValue = store.getHighlightedValue();
		if (highlightedValue == null) return;
		return store.getCollection().getElement(highlightedValue)?.id;
	});
	const handleKeydown = (event) => {
		if (event.isComposing || event.defaultPrevented) return;
		if (disabled.get()) return;
		if (handleCollectionNavigation(event, store.getCollection(), store.getHighlightedValue, store.setHighlightedValue, orientation.get())) {
			updateScroll();
			return;
		}
		switch (event.key) {
			case " ":
			case "Enter": {
				const currentValue = store.getHighlightedValue();
				if (currentValue == null) return;
				const currentItem = store.getCollection().getElement(currentValue);
				if (currentItem == null) return;
				event.preventDefault();
				currentItem.click();
			}
		}
	};
	useEffect(host, () => {
		const abortController = new AbortController();
		(props.eventTarget.get() || host).addEventListener("keydown", handleKeydown, { signal: abortController.signal });
		return () => {
			abortController.abort();
		};
	});
	useEventListener(host, "focus", () => {
		if (store.getHighlightedValue() != null) return;
		const collection = store.getCollection();
		if (collection.size() === 0) return;
		const firstSelected = store.selectedValues.get().find((v) => collection.getElement(v) != null);
		store.setHighlightedValue(firstSelected ?? collection.first());
	});
	useEffect(host, () => {
		if (disabled.get()) store.setHighlightedValue(void 0);
	});
	useEffect(host, () => {
		if (!autoHighlight.get() || disabled.get()) return;
		query.get();
		const firstValue = store.getCollection().first();
		if (firstValue == null) return;
		store.setHighlightedValue(firstValue);
		queueMicrotask(updateScroll);
	});
	const updateScroll = () => {
		const highlightedValue = store.getHighlightedValue();
		if (highlightedValue == null) return;
		const element = store.getCollection().getElement(highlightedValue);
		if (!element) return;
		element.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
	};
}
/**
* `<aria-ui-listbox-root>` custom element.
*
* Properties: {@link ListboxRootProps}
*
* Events: {@link ListboxRootEvents}
*/
var ListboxRootElement = class extends defineCustomElement(setupListboxRoot, ListboxRootPropsDeclaration) {};
/**
* @internal
*/
function registerListboxRootElement() {
	registerCustomElement("aria-ui-listbox-root", ListboxRootElement);
}
//#endregion
export { defaultItemFilter as a, ListboxItemElement as c, setupListboxItem as d, ListboxEmptyElement as f, setupListboxEmpty as h, ValuesChangeEvent as i, ListboxItemPropsDeclaration as l, registerListboxEmptyElement as m, ListboxRootPropsDeclaration as n, registerListboxRootElement as o, ListboxEmptyPropsDeclaration as p, ValueChangeEvent as r, setupListboxRoot as s, ListboxRootElement as t, registerListboxItemElement as u };

//# sourceMappingURL=listbox-root-3irWWzRe.js.map