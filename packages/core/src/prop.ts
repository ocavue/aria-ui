import kebabCase from "just-kebab-case"
import mapValues from "just-map-values"

import type { ConnectableElement } from "./connectable-element"
import { useAttribute } from "./dom"
import type { Signal } from "./signals"

/**
 * Defines options for a property.
 */
export type PropDeclaration<T = unknown> = {
  /**
   * The default value of the property.
   */
  default: T

  /**
   * Indicates how and whether the property becomes an observed attribute.
   * If the value is `false`, the property is not added to `observedAttributes`.
   * If true or absent, the kebab-case version of the property name is observed
   * (e.g. `fooBar` becomes `foo-bar`). If a string, the string value is
   * observed (e.g `attribute: 'custom-foo-bar'`).
   */
  attribute?: boolean | string

  /**
   * Called to convert an attribute value to a property
   * value.
   */
  fromAttribute?: (value: string | null) => T

  /**
   * Called to convert a property value to an attribute value.
   */
  toAttribute?: (value: T) => string | null
}

/**
 * Map of props to PropDeclaration options.
 */
export type PropDeclarations<
  T extends Record<string, any> = Record<string, any>,
> = {
  [K in keyof Required<T>]: PropDeclaration<T[K]>
}

export type GetProperties<T extends object> = T extends PropDeclarations<
  infer U
>
  ? U
  : never

function getFromAttribute<T = unknown>(
  prop: PropDeclaration<T>,
): ((value: string | null) => T) | undefined {
  if (prop.fromAttribute) {
    return prop.fromAttribute
  }

  switch (typeof prop.default) {
    case "string":
      return (value) => {
        if (value == null) {
          return prop.default
        }
        return String(value) as T
      }
    case "number":
      return (value) => {
        if (value == null) {
          return prop.default
        }
        return Number(value) as T
      }
    case "boolean":
      return (value) => {
        if (value == null) {
          return prop.default
        }
        return (value !== "false") as T
      }
  }
}

function getToAttribute<T = unknown>(
  prop: PropDeclaration<T>,
): ((value: T) => string | null) | undefined {
  if (prop.toAttribute) {
    return prop.toAttribute
  }

  switch (typeof prop.default) {
    case "string":
    case "number":
    case "boolean":
      return String
  }
}

export function getAttributeMappings<T extends Record<string, unknown>>(
  declarations: PropDeclarations<T>,
) {
  const attributes: string[] = []
  const attributeToProperty = new Map<string, string>()
  const propertyToAttribute = new Map<string, string>()

  for (const [property, declaration] of Object.entries(declarations)) {
    if (declaration.attribute === false) {
      continue
    }

    const attribute =
      typeof declaration.attribute === "string"
        ? declaration.attribute
        : kebabCase(property)

    attributes.push(attribute)
    attributeToProperty.set(attribute, property)
    propertyToAttribute.set(property, attribute)
  }

  return [attributes, attributeToProperty, propertyToAttribute] as const
}

export function setupProperties(props: PropDeclarations) {
  const [observedAttributes, attributeToProperty, propertyToAttribute] =
    getAttributeMappings(props)

  const fromAttributes = mapValues(props, getFromAttribute)
  const toAttributes = mapValues(props, getToAttribute)

  const attributeChangedCallback = (
    signals: Record<string, Signal<unknown>>,
    attribute: string,
    newValue: string | null,
  ) => {
    const property = attributeToProperty.get(attribute)
    if (!property) {
      return
    }

    const signal = signals[property]
    if (!signal) {
      return
    }

    const fromAttribute = fromAttributes[property]
    if (!fromAttribute) {
      return
    }

    signal.set(fromAttribute(newValue))
  }

  const useProperties = (
    element: ConnectableElement,
    signals: Record<string, Signal<unknown>>,
  ) => {
    for (const [property, attribute] of propertyToAttribute.entries()) {
      const signal = signals[property]
      if (!signal) {
        continue
      }

      const toAttribute = toAttributes[property]
      if (!toAttribute) {
        continue
      }

      useAttribute(element, attribute, () => {
        const value = signal.get()
        if (value !== props[property]?.default) {
          return toAttribute(value)
        }
        return null
      })
    }
  }

  return [observedAttributes, attributeChangedCallback, useProperties] as const
}
