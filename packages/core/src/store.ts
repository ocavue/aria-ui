import type { AnyProps, PropsDeclaration } from './define-props.ts'
import { createSignal, type Signal } from './signal.ts'

/**
 * A state is simply a collection of signals.
 */
export type State<Props extends AnyProps> = {
  [Key in keyof Props]: Signal<Props[Key]>
}

/**
 * @internal
 */
export function createState<Props extends AnyProps>(
  propsDeclaration: PropsDeclaration<Props>,
): State<Props> {
  const store: Record<string, Signal<any>> = {}

  for (const key of Object.keys(propsDeclaration)) {
    const declaration = propsDeclaration[key]
    const signal = createSignal(declaration.default)
    store[key] = signal
  }

  return store as State<Props>
}
