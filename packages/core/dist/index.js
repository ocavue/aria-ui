import { computed, effect, signal } from "alien-signals";
import { getDocumentElement, getEventTarget } from "@zag-js/dom-query";
import { HTMLElement } from "server-dom-shim";
//#region src/on-mount.ts
function onMount(host, callback) {
	let callbackDispose;
	const hostConnected = () => {
		callbackDispose?.();
		callbackDispose = void 0;
		callbackDispose = callback();
	};
	const hostDisconnected = () => {
		callbackDispose?.();
		callbackDispose = void 0;
	};
	const controller = {
		hostConnected,
		hostDisconnected
	};
	host.addController(controller);
	return () => {
		host.removeController(controller);
		hostDisconnected();
	};
}
//#endregion
//#region src/use-effect.ts
function useEffect(host, callback) {
	return onMount(host, () => {
		return effect(callback);
	});
}
//#endregion
//#region src/attribute.ts
/**
* @internal
*/
function usePropertiesToAttributes(element, store, declarations) {
	for (const [propertyName, declaration] of Object.entries(declarations)) {
		const attributeName = declaration.attribute;
		if (!attributeName) continue;
		const defaultValue = declaration.default;
		const signal = store[propertyName];
		useEffect(element, () => {
			const propertyValue = signal.get();
			if (propertyValue === defaultValue && !element.hasAttribute(attributeName)) return;
			const attributeValue = propertyToAttribute(declaration, propertyValue);
			if (attributeValue !== element.getAttribute(attributeName)) element.setAttribute(attributeName, attributeValue);
		});
	}
}
/**
* @internal
*/
function handleAttributeChanged(store, declarations, attributeNameToPropertyName, attributeName, attributeValue) {
	const propertyName = attributeNameToPropertyName.get(attributeName);
	if (!propertyName) return;
	const declaration = declarations[propertyName];
	const signal = store[propertyName];
	const defaultValue = declaration.default;
	if (attributeValue == null) {
		if (signal.get() === defaultValue) return;
		signal.set(defaultValue);
		return;
	}
	if (propertyToAttribute(declaration, signal.get()) === attributeValue) return;
	const propertyValue = propertyFromAttribute(declaration, attributeValue);
	signal.set(propertyValue);
}
/**
* @internal
*/
function createAttributePropertyNameMap(declarations) {
	const attributeNameToPropertyName = /* @__PURE__ */ new Map();
	for (const [propertyName, declaration] of Object.entries(declarations)) {
		const attributeName = declaration.attribute;
		if (attributeName) attributeNameToPropertyName.set(attributeName, propertyName);
	}
	return attributeNameToPropertyName;
}
function propertyToAttribute(declaration, propertyValue) {
	switch (declaration.type) {
		case "boolean": return booleanToAttribute(propertyValue);
		case "string": return stringToAttribute(propertyValue);
		case "number": return numberToAttribute(propertyValue);
		case "json":
		case void 0: return jsonToAttribute(propertyValue);
		default: throw new Error(`[aria-ui] Unsupported type: ${declaration.type}`);
	}
}
function propertyFromAttribute(declaration, attributeValue) {
	switch (declaration.type) {
		case "boolean": return booleanFromAttribute(attributeValue);
		case "string": return stringFromAttribute(attributeValue);
		case "number": return numberFromAttribute(attributeValue);
		case "json":
		case void 0: {
			const jsonValue = jsonFromAttribute(attributeValue);
			return jsonValue === void 0 ? declaration.default : jsonValue;
		}
		default: throw new Error(`[aria-ui] Unsupported type: ${declaration.type}`);
	}
}
function booleanToAttribute(value) {
	if (value === true) return "true";
	if (value === false) return "false";
	throw new Error(`[aria-ui] Invalid boolean property value: ${value}`);
}
function booleanFromAttribute(value) {
	if (value === "true" || value === "") return true;
	if (value === "false") return false;
	console.warn(`[aria-ui] Invalid boolean attribute value: ${value}`);
	return false;
}
function stringToAttribute(value) {
	if (typeof value === "string") return value;
	throw new Error(`[aria-ui] Invalid string property value: ${value}`);
}
function stringFromAttribute(value) {
	return value;
}
function numberToAttribute(value) {
	if (typeof value === "number") return String(value);
	throw new Error(`[aria-ui] Invalid number property value: ${value}`);
}
function numberFromAttribute(value) {
	const number = Number(value);
	if (Number.isNaN(number)) {
		console.warn(`[aria-ui] Invalid number attribute value: ${value}`);
		return 0;
	}
	return number;
}
function jsonToAttribute(value) {
	if (value === void 0) return "";
	try {
		return JSON.stringify(value);
	} catch (error) {
		throw new Error(`[aria-ui] Invalid JSON property value: ${error}`, { cause: error });
	}
}
function jsonFromAttribute(value) {
	if (value === "") return;
	try {
		return JSON.parse(value);
	} catch (error) {
		console.warn(`[aria-ui] Invalid JSON attribute value: ${value}`, error);
		return;
	}
}
//#endregion
//#region src/signal.ts
/**
* Create a reactive signal.
*
* @internal
*/
function createSignal(initialValue) {
	const fn = signal(initialValue);
	return {
		get: () => fn(),
		set: (value) => fn(value)
	};
}
//#endregion
//#region src/context.ts
var ContextRequestEvent = class extends Event {
	constructor(key, callback) {
		super("aria-ui:context-request", {
			bubbles: true,
			composed: true
		});
		this.key = key;
		this.callback = callback;
	}
};
var ContextProviderEvent = class extends Event {
	constructor(key) {
		super("aria-ui:context-provider", {
			bubbles: true,
			composed: true
		});
		this.key = key;
	}
};
var ContextImpl = class {
	constructor(key) {
		this.key = key;
		this.provide = this.provide.bind(this);
		this.consume = this.consume.bind(this);
	}
	provide(element, value) {
		const consumers = /* @__PURE__ */ new Map();
		const handleRequest = (event) => {
			if (event.key !== this.key) return;
			const consumer = getEventTarget(event);
			if (element === consumer || consumers.has(event.callback) || !consumer) return;
			event.stopPropagation();
			event.callback(value);
			consumers.set(event.callback, consumer);
		};
		/**
		* When we get a provider request event, that means a child of this element
		* has just woken up. If it's a provider of our context, then we may need to
		* re-parent our subscriptions, because is a more specific provider than us
		* for its subtree.
		*/
		const handleProvider = (event) => {
			if (event.key !== this.key) return;
			const provider = getEventTarget(event);
			if (!provider) return;
			if (element === provider) return;
			event.stopPropagation();
			const previousConsumers = Array.from(consumers);
			consumers.clear();
			for (const [callback, consumer] of previousConsumers) consumer.dispatchEvent(new ContextRequestEvent(this.key, callback));
		};
		element.addController({
			hostConnected: () => {
				ensureAttachRoot(getDocumentElement(element));
				element.addEventListener("aria-ui:context-request", handleRequest);
				element.addEventListener("aria-ui:context-provider", handleProvider);
				element.dispatchEvent(new ContextProviderEvent(this.key));
			},
			hostDisconnected: () => {
				element.removeEventListener("aria-ui:context-request", handleRequest);
				element.removeEventListener("aria-ui:context-provider", handleProvider);
			}
		});
	}
	consume(element) {
		const controller = new ConsumerController(this.key, element);
		element.addController(controller);
		return () => controller.get();
	}
};
var ConsumerController = class {
	constructor(key, host) {
		this.key = key;
		this.host = host;
		const { get, set } = createSignal(void 0);
		this.get = get;
		this.set = set;
	}
	hostConnected() {
		ensureAttachRoot(getDocumentElement(this.host));
		this.host.dispatchEvent(new ContextRequestEvent(this.key, this.set));
	}
};
/**
* Creates a new context.
*
* @param key The key to use for the context.
*
* @group Contexts
*/
function createContext(key) {
	return new ContextImpl(typeof key === "string" ? `aria-ui:context:${key}` : key);
}
const attachedRoots = /* @__PURE__ */ new WeakSet();
function ensureAttachRoot(root) {
	if (attachedRoots.has(root)) return;
	attachedRoots.add(root);
	attachRoot(root);
}
/**
* Gathers unsatisfied context requests and re-dispatch them when new providers
* which satisfy matching context keys are available.
*
* This allows providers to be added to a DOM tree, or upgraded, after the
* consumers.
*/
function attachRoot(element) {
	const store = /* @__PURE__ */ new Map();
	const popPendingRequests = (key) => {
		const pendingRequestData = store.get(key);
		if (pendingRequestData === void 0) return;
		store.delete(key);
		return pendingRequestData;
	};
	const getPendingRequests = (key) => {
		let pendingRequestData = store.get(key);
		if (pendingRequestData === void 0) {
			pendingRequestData = {
				callbacks: /* @__PURE__ */ new WeakMap(),
				requests: []
			};
			store.set(key, pendingRequestData);
		}
		return pendingRequestData;
	};
	const onContextProvider = (event) => {
		const pendingRequestData = popPendingRequests(event.key);
		if (pendingRequestData === void 0) return;
		const { requests } = pendingRequestData;
		for (const { elementRef, callbackRef } of requests) {
			const element = elementRef.deref();
			const callback = callbackRef.deref();
			if (element === void 0) continue;
			if (callback === void 0) continue;
			element.dispatchEvent(new ContextRequestEvent(event.key, callback));
		}
	};
	const onContextRequest = (event) => {
		const element = getEventTarget(event);
		if (!element) return;
		const callback = event.callback;
		const pendingRequestData = getPendingRequests(event.key);
		let callbacks = pendingRequestData.callbacks.get(element);
		if (callbacks === void 0) {
			callbacks = /* @__PURE__ */ new WeakSet();
			pendingRequestData.callbacks.set(element, callbacks);
		}
		if (callbacks.has(callback)) return;
		callbacks.add(callback);
		pendingRequestData.requests.push({
			elementRef: new WeakRef(element),
			callbackRef: new WeakRef(callback)
		});
	};
	element.addEventListener("aria-ui:context-request", onContextRequest);
	element.addEventListener("aria-ui:context-provider", onContextProvider);
}
//#endregion
//#region src/host-element.ts
var HostElement = class extends HTMLElement {
	constructor(..._args) {
		super(..._args);
		this._connected = false;
	}
	addController(controller) {
		const controllers = this._controllers ??= /* @__PURE__ */ new Set();
		if (controllers.has(controller)) throw new Error("Controller is already added to the host");
		controllers.add(controller);
		if (this._connected) controller.hostConnected?.();
	}
	removeController(controller) {
		this._controllers?.delete(controller);
	}
	connectedCallback() {
		this._connected = true;
		const controllers = Array.from(this._controllers ?? []);
		for (const c of controllers) c.hostConnected?.();
	}
	disconnectedCallback() {
		this._connected = false;
		const controllers = Array.from(this._controllers ?? []);
		for (const c of controllers) c.hostDisconnected?.();
	}
};
//#endregion
//#region src/store.ts
/**
* @internal
*/
function createState(propsDeclaration) {
	const store = {};
	for (const [key, declaration] of Object.entries(propsDeclaration)) store[key] = createSignal(declaration.default);
	return store;
}
//#endregion
//#region src/define-custom-element.ts
function defineCustomElement(setup, props) {
	const attributeNameToPropertyName = createAttributePropertyNameMap(props);
	const observedAttributes = Array.from(attributeNameToPropertyName.keys());
	const hasAttributes = observedAttributes.length > 0;
	class CustomElement extends HostElement {
		static {
			this.observedAttributes = observedAttributes;
		}
		constructor() {
			super();
			this._store = createState(props);
			setup(this, this._store);
			if (hasAttributes) usePropertiesToAttributes(this, this._store, props);
		}
		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue === newValue) return;
			handleAttributeChanged(this._store, props, attributeNameToPropertyName, name, newValue);
		}
	}
	defineGetterSetter(CustomElement, props);
	return CustomElement;
}
function defineGetterSetter(ElementConstructor, props) {
	for (const prop of Object.keys(props)) Object.defineProperty(ElementConstructor.prototype, prop, {
		enumerable: true,
		configurable: false,
		get() {
			return this._store[prop].get();
		},
		set(v) {
			if (v === void 0) return;
			this._store[prop].set(v);
		}
	});
}
//#endregion
//#region src/define-props.ts
/**
* Define a set of properties.
*/
function defineProps(props) {
	return Object.freeze(props);
}
//#endregion
//#region src/register-custom-element.ts
/**
* Adds the given custom element to the custom element registry.
*/
function registerCustomElement(name, constructor) {
	if (seen.has(name)) return;
	seen.add(name);
	if (typeof window !== "undefined") {
		const customElements = window.customElements;
		if (customElements && !customElements.get(name)) customElements.define(name, constructor);
	}
}
const seen = /* @__PURE__ */ new Set();
//#endregion
export { HostElement, computed, createAttributePropertyNameMap, createContext, createSignal, createState, defineCustomElement, defineProps, handleAttributeChanged, onMount, registerCustomElement, useEffect, usePropertiesToAttributes };

//# sourceMappingURL=index.js.map