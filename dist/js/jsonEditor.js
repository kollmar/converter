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
    	"Array": [1, 2, 3],
    	"Boolean": true,
    	"Null": "notNull (kurz)",
    	"Number": 123,
    	"Object": {
    		"a": "b",
    		"c": "d"
    	},
    	"String": "Hello World"
    };

    const jsonDummy = () => {

    	fetch("/converter/test_relaxx_json.json")
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