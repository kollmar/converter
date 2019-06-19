"use strict";
// create the editor
var container,
	container2,
	options,
	json,
	editor,
	editor2,
	temp;

container = document.getElementById("jsoneditor");
container2 = document.getElementById("jsoneditor2");

options = {
	mode: 'tree',
	modes: ['code', 'form', 'text', 'tree', 'view']
};

editor = new JSONEditor(container, {
	mode: 'view',
	modes: ['view', 'text', 'code']
});
editor2 = new JSONEditor(container2, options);
// set json
json = {
	"Array": [
		"it.took", 
		"it.timed_ou",
		[
			"it._shards.skipped",
			2,
			[
				"it._shards.skipped",
				[
					"it._shards.skipped",
					"it.hits.max_score",
					"it.took"
				],
				[
					"it._shards.skipped",
					2,
					[
						"it._shards.skipped",
						[
							"it._shards.skipped",
							2,
							3
						],
						"it.hits.max_score"
					]
				],
				2
			]
		],
		"it._shards.skipped"
	],
	"Boolean": true,
	"Null": "it._shards.skipped",
	"Number": 123,
	"jobs": {
		"a": "b",
		"c": "d"
	},
	"String": "Hello World"
};

const jsonDummy = () => {

	// fetch("/converter/test_relaxx_json.json")
	fetch("http://localhost:8080/test_relaxx_json.json")
		.then(res => res.json())
		.then((urlJsonData) => {
			editor.update(urlJsonData);
		})
		.catch(err => console.log(err));
};

jsonDummy();
editor2.set(json);

// get json
// json = editor.get();