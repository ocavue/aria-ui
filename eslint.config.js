import { basic } from "@ocavue/eslint-config"

export default [
  ...basic(),
  {
    ignores: [
      "**/.astro",

      // TODO: Remove the ignore once this PR is merged and released
      // https://github.com/tgreyuk/typedoc-plugin-markdown/pull/579
      "packages/typedoc-plugin/",
    ],
  },
]
