import { ElementBuilder } from "@aria-ui/core"

import { defaultSelectRootProps, type SelectRootProps } from "./select-root.props"
import { useSelectRoot } from "./select-root.state"

/**
 * A custom SelectRoot element.
 *
 * @group SelectRoot
 */
export class SelectRootElement extends ElementBuilder<SelectRootProps>(
  useSelectRoot,
  defaultSelectRootProps,
) {}
