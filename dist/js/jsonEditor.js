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
		"took",
		"timed_out",
		[
			"_shards.skipped",
			2,
			[
				"_shards.skipped",
				[
					"_shards.skipped",
					"hits.max_score",
					"took"
				],
				[
					"_shards.skipped",
					2,
					[
						"_shards.skipped",
						[
							"_shards.skipped",
							2,
							3
						],
						"hits.max_score"
					]
				],
				2
			]
		],
		"_shards.skipped"
	],
	"Boolean": true,
	"Null": "_shards.skipped",
	"Number": 123,
	"jobs": {
		"a": "b",
		"test": ["took"],
		"c": {
			"a": "b",
			"c": "d"
		},
		"d": {
			"a": "b",
			"c": "d"
		}
	},
	"String": "hits.hits._source.location.city",
	"jobs": {
		"job": [{
			"Stellentitel": "it._source.name_fulltext",
			"city": "it._source.location.city",
			"zip": "it._source.location.zip"
		}
		]
	}
};

const jsonDummy = () => {

	// fetch("/converter/test_relaxx_json.json")
	fetch("http://localhost:8080/test_relaxx_json.json")
	.then(res => res.json())
	.then((urlJsonData) => {
		editor.update(urlJsonData);
	})
	.catch((err) => {
		console.log(err);
			fetch("/converter/test_relaxx_json.json")
			// fetch("http://localhost:8080/test_relaxx_json.json")
			.then(res => res.json())
			.then((urlJsonData) => {
				editor.update(urlJsonData);
			})
			.catch(err => console.log(err));
		});
};

jsonDummy();
editor2.set(json);

// get json
// json = editor.get();