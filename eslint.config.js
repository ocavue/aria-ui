import { defineESLintConfig } from "@ocavue/eslint-config"

export default defineESLintConfig({}, [
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/unbound-method": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
])
