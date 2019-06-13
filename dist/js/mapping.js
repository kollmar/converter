const mapFields = {
	"getEditor2": 
		{
			"json": editor2.get()
		}
	,
	"changeContent": () => {
		let contentLeft    = editor.get();
		let contentRight   = mapFields.getEditor2.json;

		console.log(contentLeft);
		console.log(contentRight);

	},
	"getChanges": () => {
		alert(this.editor2);
	}
}