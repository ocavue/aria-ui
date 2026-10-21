//#region src/parse.d.ts
/**
 * Information about a component prop
 */
interface PropInfo {
  /**
   * The name of the prop
   */
  name: string;
  /**
   * JSDoc comment describing the prop
   */
  comment: string;
}
/**
 * Information about a component event
 */
interface EventInfo {
  /**
   * The name of the event
   */
  name: string;
  /**
   * JSDoc comment describing the event
   */
  comment: string;
  /**
   * The type name of the event (e.g., "OpenChangeEvent")
   */
  typeName: string | undefined;
}
/**
 * Information about a component
 */
interface ComponentInfo {
  /**
   * The component name (e.g., "PopoverRoot")
   */
  name: string;
  /**
   * Absolute path to the source file where this component is defined
   */
  sourceFilePath: string;
  /**
   * Array of props with name and JSDoc comment
   */
  props: PropInfo[];
  /**
   * Array of events with name and JSDoc comment
   */
  events: EventInfo[];
}
//#endregion
//#region src/generate.d.ts
type Framework = 'react' | 'preact' | 'solid' | 'vue' | 'svelte';
declare const FRAMEWORKS: Framework[];
interface GenerateOptions {
  prefix: string;
  importSource: string;
  framework: Framework;
  wrapperExtensions?: WrapperExtension[];
}
interface WrapperMatchContext {
  framework: Framework;
  component: ComponentInfo;
  importSource: string;
}
interface WrapperApplyContext extends WrapperMatchContext {
  getPropVariable(propName: string): string;
  addImport(moduleSpecifier: string, namedImports: string[]): void;
  addSetupStatement(statement: string): void;
  setRenderPropsExpression(expression: string): void;
  setReactPropOverride(propName: string, expression: string): void;
  addSvelteScriptStatement(statement: string): void;
}
interface WrapperExtension {
  name: string;
  match?: (context: WrapperMatchContext) => boolean;
  apply(context: WrapperApplyContext): void;
}
interface FrameworkHookResolver {
  importSource: string;
  importName: string;
  callExpression?: string;
}
interface PropFallbackExtensionOptions {
  prop: string;
  match?: (context: WrapperMatchContext) => boolean;
  frameworks: Partial<Record<Framework, FrameworkHookResolver>>;
}
declare function propFallback(options: PropFallbackExtensionOptions): WrapperExtension;
//#endregion
//#region src/build.d.ts
interface BuildOptions {
  tsconfig: string;
  entry: string;
  output: string;
  prefix: string;
  importSource: string;
  framework: Framework;
  wrapperExtensions?: WrapperExtension[];
}
declare function build(options: BuildOptions): Promise<void>;
//#endregion
export { type BuildOptions, FRAMEWORKS, type Framework, type FrameworkHookResolver, type GenerateOptions, type PropFallbackExtensionOptions, type WrapperApplyContext, type WrapperExtension, type WrapperMatchContext, build, propFallback };
//# sourceMappingURL=index.d.mts.map