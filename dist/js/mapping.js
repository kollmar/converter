"use strict";

const mapFields = {
	"getJsons": {
		"editor": () => {
			return editor.get();
		},
		"editor2": () => {
			return editor2.get()
		}
	},
	"setJsons": {
		"editor": (jsonObj) => {
			return editor.set(jsonObj);
		},
		"editor2": (jsonObj) => {
			return editor2.set(jsonObj);
		}
	},
	"changeContent": () => {
		let contentLeft = mapFields.getJsons.editor();
		let contentRight = mapFields.getJsons.editor2();

		mapFields.lookingForRelaxxFields(contentRight);
	},
	"getChanges": () => {
		alert(this.editor2);
	},
	"lookingForRelaxxFields": (jsonValues) => {
		let boolFieldMapping = false;
		let arrList;
		Object.entries(jsonValues).forEach(([key, content]) => {

			if (content !== null && typeof content !== 'object' && !Array.isArray(content)) {
				let checkContent = content.toString().match(/(it.)[^+]*/gi);
				if(checkContent !== null) {
					arrList = checkContent;
					if (Array.isArray(arrList) && arrList.length) {
						jsonValues[key] = mapFields.mapNewValue(arrList);
	
						boolFieldMapping = true;
					}
				}				
			}
		});
		(boolFieldMapping === true) ? editor2.update(jsonValues): alert("Keine Felder gemappt!");

	},
	"mapNewValue": (searchingField) => {
		let contentLeft = mapFields.getJsons.editor();
		let newContent = "";
		let searchField = searchingField.map(value => value.substring(3, value.length).trim());
		searchField = searchField[0].split(".");
		console.log(searchField);
		for (let i = 0; i < searchField.length; i++) {
			if (newContent === "") {
				newContent = contentLeft[searchField[i]];
				if(searchField.length === 1){
					return newContent;
				}
			} else {
				if (!(i === searchField.length - 1)) {
					newContent = newContent[searchField[i]];
				} else {
					return newContent = newContent[searchField[i]];
				}
			}
		}
	},
	"goThroughObject": (objContent, objName) => {

	}
}