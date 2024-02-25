import { basic } from "@ocavue/eslint-config"

export default [
  ...basic(),
  // Remove the ignore once this PR is merged
  // https://github.com/tgreyuk/typedoc-plugin-markdown/pull/579
  { ignores: ["packages/typedoc-plugin/"] },
]
