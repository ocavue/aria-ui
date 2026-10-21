import { n as FRAMEWORKS, t as build } from "./build-BSwhlBIa.mjs";
import { buildApplication, buildCommand, run } from "@stricli/core";
//#region package.json
var version = "0.1.9";
//#endregion
//#region src/bin.ts
const command = buildCommand({
	async func(flags) {
		return await build(flags);
	},
	parameters: { flags: {
		tsconfig: {
			kind: "parsed",
			parse: String,
			brief: "Path to tsconfig.json. For example \"./tsconfig.json\"."
		},
		entry: {
			kind: "parsed",
			parse: String,
			brief: "Path to the exports entry file. For example \"./src/foo/index.ts\"."
		},
		output: {
			kind: "parsed",
			parse: String,
			brief: "Output directory for generated files. For example \"./output/react/foo\"."
		},
		prefix: {
			kind: "parsed",
			parse: String,
			brief: "Custom element tag prefix",
			default: "aria-ui"
		},
		importSource: {
			kind: "parsed",
			parse: String,
			brief: "Module path for imports in generated code. For example \"../../src/foo/index.ts\"."
		},
		framework: {
			kind: "enum",
			values: FRAMEWORKS,
			brief: "Target framework to generate components for."
		}
	} },
	docs: { brief: "Generate framework-specific component wrappers from aria-ui components" }
});
const app = buildApplication(command, {
	name: "aria-ui",
	versionInfo: { currentVersion: version },
	scanner: { caseStyle: "allow-kebab-for-camel" }
});
run(app, process.argv.slice(2), { process });
//#endregion
export {};

//# sourceMappingURL=bin.mjs.map