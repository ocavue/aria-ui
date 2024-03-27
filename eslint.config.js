import { basic, tsPlugin } from "@ocavue/eslint-config"

export default [
  ...basic(),
  {
    files: ["scripts/**/*.ts"],
    plugins: {
      "@typescript-eslint/": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/unbound-method": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    ignores: [
      "**/.astro",

      // TODO: Remove the ignore once this PR is merged and released
      // https://github.com/tgreyuk/typedoc-plugin-markdown/pull/579
      "packages/typedoc-plugin/",
    ],
  },
]
