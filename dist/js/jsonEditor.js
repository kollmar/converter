		// create the editor
		var container, options, json, editor;

        container = document.getElementById("jsoneditor");
        options = {
			mode: 'tree',
			modes: ['code', 'form', 'text', 'tree', 'view']
        };
        editor = new JSONEditor(container, options);

        // set json
        json = {
            "Array": [1, 2, 3],
            "Boolean": true,
            "Null": null,
            "Number": 123,
            "Object": {
                "a": "b",
                "c": "d"
            },
            "String": "Hello World"
        };
        editor.set(json);

        // get json
        json = editor.get();