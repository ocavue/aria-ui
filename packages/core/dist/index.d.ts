import { computed } from "alien-signals";
import { HTMLElement as HTMLElement$1 } from "server-dom-shim";
//#region src/define-props.d.ts
/**
 * @internal
 */
type AnyProps = Record<string, any>;
/**
 * Declare a property.
 */
interface PropDeclaration<T> {
  /**
   * The default value of the property. It must not be `undefined`. Use `null` if you want to indicate that the default value is empty.
   */
  default: T;
  /**
   * The attribute name associated with the property, or `false` to not associate an attribute.
   */
  attribute: string | false;
  /**
   * How the property is converted to and from an attribute string. This is not used when `attribute` is `false`. The default value is `"json"`.
   */
  type?: 'boolean' | 'string' | 'number' | 'json';
}
/**
 * Declare a set of properties.
 */
type PropsDeclaration<Props extends AnyProps> = Readonly<{ [K in keyof Props]: PropDeclaration<Props[K]>; }>;
/**
 * Define a set of properties.
 */
declare function defineProps<Props extends AnyProps>(props: PropsDeclaration<Props>): PropsDeclaration<Props>;
//#endregion
//#region src/reactive-controller.d.ts
interface ReactiveControllerHost {
  addController(controller: ReactiveController): void;
  removeController(controller: ReactiveController): void;
}
interface ReactiveController {
  hostConnected?(): void;
  hostDisconnected?(): void;
}
//#endregion
//#region src/host-element.d.ts
declare class HostElement extends HTMLElement$1 implements ReactiveControllerHost {
  private _controllers;
  private _connected;
  addController(controller: ReactiveController): void;
  removeController(controller: ReactiveController): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}
//#endregion
//#region src/signal.d.ts
/**
 * A reactive signal.
 */
interface Signal<T> {
  get: () => T;
  set: (value: T) => void;
}
/**
 * Create a reactive signal.
 *
 * @internal
 */
declare function createSignal<T>(initialValue: T): Signal<T>;
//#endregion
//#region src/store.d.ts
/**
 * A state is simply a collection of signals.
 */
type State<Props extends AnyProps> = { [Key in keyof Props]: Signal<Props[Key]>; };
/**
 * @internal
 */
declare function createState<Props extends AnyProps>(propsDeclaration: PropsDeclaration<Props>): State<Props>;
//#endregion
//#region src/attribute.d.ts
/**
 * @internal
 */
declare function usePropertiesToAttributes(element: HostElement, store: State<AnyProps>, declarations: PropsDeclaration<AnyProps>): void;
/**
 * @internal
 */
declare function handleAttributeChanged(store: State<AnyProps>, declarations: PropsDeclaration<AnyProps>, attributeNameToPropertyName: Map<string, string>, attributeName: string, attributeValue: string | null | undefined): void;
/**
 * @internal
 */
declare function createAttributePropertyNameMap(declarations: PropsDeclaration<AnyProps>): Map<string, string>;
//#endregion
//#region src/context.d.ts
type ContextCallback<T> = (value: T) => void;
declare class ContextRequestEvent<T> extends Event {
  readonly key: string | symbol;
  readonly callback: ContextCallback<T>;
  constructor(key: string | symbol, callback: ContextCallback<T>);
}
declare class ContextProviderEvent extends Event {
  readonly key: string | symbol;
  constructor(key: string | symbol);
}
declare global {
  interface HTMLElementEventMap {
    'aria-ui:context-request': ContextRequestEvent<unknown>;
    'aria-ui:context-provider': ContextProviderEvent;
  }
}
/**
 * A context is a way to provide and consume signals in a HTML tree.
 *
 * @group Contexts
 */
interface Context<T> {
  /**
   * Provides a signal to all children of the element.
   */
  provide(element: HTMLElement, value: T): void;
  /**
   * Receives the signal from a parent element.
   */
  consume(element: HTMLElement): () => T | undefined;
}
/**
 * Creates a new context.
 *
 * @param key The key to use for the context.
 *
 * @group Contexts
 */
declare function createContext<T>(key: string | symbol): Context<T>;
//#endregion
//#region src/define-custom-element.d.ts
/**
 * @internal
 */
type HostElementConstructor<Props extends AnyProps> = new () => HostElement & Props;
type SetupFunction<Props extends AnyProps> = (host: HostElement, props: State<Props>) => void;
declare function defineCustomElement<Props extends AnyProps = object>(setup: SetupFunction<Props>, props: PropsDeclaration<Props>): HostElementConstructor<Props>;
//#endregion
//#region src/on-mount.d.ts
declare function onMount(host: HostElement, callback: () => VoidFunction | void): VoidFunction;
//#endregion
//#region src/register-custom-element.d.ts
/**
 * Adds the given custom element to the custom element registry.
 */
declare function registerCustomElement(name: string, constructor: CustomElementConstructor): void;
//#endregion
//#region src/use-effect.d.ts
declare function useEffect(host: HostElement, callback: () => VoidFunction | void): VoidFunction;
//#endregion
export { type AnyProps, type Context, HostElement, type HostElementConstructor, type PropDeclaration, type PropsDeclaration, type Signal, type State, computed, createAttributePropertyNameMap, createContext, createSignal, createState, defineCustomElement, defineProps, handleAttributeChanged, onMount, registerCustomElement, useEffect, usePropertiesToAttributes };
//# sourceMappingURL=index.d.ts.map