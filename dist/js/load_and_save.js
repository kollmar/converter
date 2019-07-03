// Load a JSON document
FileReaderJS.setupInput(document.getElementById('loadDocument'), {
	readAsDefault: 'Text',
	on: {
		load: function (event, file) {
			editor2.setText(event.target.result);
		}
	}
});

// Save a JSON document
document.getElementById('saveDocument').onclick = function () {
	// Save Dialog
	fname = window.prompt("Save as...");

	// Check json extension in file name
	if (fname.indexOf(".") == -1) {
		fname = fname + ".json";
	} else {
		if (fname.split('.').pop().toLowerCase() == "json") {
			// Nothing to do
		} else {
			fname = fname.split('.')[0] + ".json";
		}
	}
	let project = {
		"url": () => {
			return document.getElementById('jsonURL').value
		},
		"urlJobs": () => {
			return document.getElementById('jobFields').value
		},
		"dummyJobs": () => {
			return document.getElementById('dummyFields').value
		},
		"dummy": () => {
			return editor2.getText()
		}
	};
	let jsonProject = '{"url":"' + project.url() + '"' +
		',"urlJobs":"' + project.urlJobs() + '"' +
		',"dummyJobs":"' + project.dummyJobs() + '"' +
		',"dummy":' + project.dummy() + 
		'}';

	console.log(jsonProject);

	var blob = new Blob([jsonProject], {
		type: 'application/json;charset=utf-8'
	});
	saveAs(blob, fname);
};
