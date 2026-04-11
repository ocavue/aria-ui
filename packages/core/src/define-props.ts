/**
 * @internal
 */
export type AnyProps = Record<string, any>

/**
 * Declare a property.
 */
export interface PropDeclaration<T> {
  /**
   * The default value of the property. It must not be `undefined`. Use `null` if you want to indicate that the default value is empty.
   */
  default: T

  /**
   * The attribute name associated with the property, or `false` to not associate an attribute.
   */
  attribute: string | false

  /**
   * How the property is converted to and from an attribute string. This is not used when `attribute` is `false`. The default value is `"json"`.
   */
  type?: 'boolean' | 'string' | 'number' | 'json'
}

/**
 * Declare a set of properties.
 */
export type PropsDeclaration<Props extends AnyProps> = Readonly<{
  [K in keyof Props]: PropDeclaration<Props[K]>
}>

/**
 * Define a set of properties.
 */
export function defineProps<Props extends AnyProps>(
  props: PropsDeclaration<Props>,
): PropsDeclaration<Props> {
  return Object.freeze(props)
}
