window.onload = () => {

	"use strict";
	
	const readURL = (inputURL) => {
		return console.log(inputURL);
	}

	const getJSON = (url) => {
		let baseUrl = window.location.origin;
		// console.log(baseUrl + "/converter/proxy.php?path=" + url);
		fetch(baseUrl + "/converter/proxy.php?path=" + url)
			.then(res => res.json())
			.then((urlJsonData) => {
				console.log(urlJsonData);
				editor.update(urlJsonData);

				json = editor.get();
			})
			.catch(err => console.log(err));
	}

	document.getElementById('laden').onclick = () => {
		let url = document.getElementById('jsonURL').value;
		
		getJSON(url);
	}

	document.getElementById('reloadToList').onclick = () => {	
		sumKeysNames = [];
		specificJsonObj(editor.get(), document.getElementById('jobFields').value, "list");
		// console.table(sumKeysNames);
		editor.set(sumKeysNames);
	}

	document.getElementById('reloadToJSON').onclick = () => {
		specificJsonObj(editor.get(), document.getElementById('jobFields').value, "json");	
	}
	document.getElementById('getDummyMapping').onclick = () => {
		console.log(mapFields.getDummyFromMapping());
	}
	document.getElementById('jsoneditor').ondblclick = () => {
		console.log(mapFields.getCountedJobs());
		mapFields.addJobsToDummy(mapFields.getCountedJobs());
	}
}