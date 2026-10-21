//#region src/events/index.ts
var SelectEvent = class extends Event {
	constructor(value = "") {
		super("select", { bubbles: false });
		this.detail = value;
	}
};
//#endregion
export { SelectEvent as t };

//# sourceMappingURL=events-HqWWLGoO.js.map