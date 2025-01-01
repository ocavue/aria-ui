 

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.astro" {
  const value: () => unknown
  export default value
}
