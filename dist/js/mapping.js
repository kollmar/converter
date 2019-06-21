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
	"updateJsons": {
		"editor": (jsonObj) => {
			return editor.update(jsonObj);
		},
		"editor2": (jsonObj) => {
			return editor2.update(jsonObj);
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
		
		Object.entries(jsonValues).forEach(([key, content]) => {
			mapFields.checkTypeOfFields.normalFields(content,jsonValues, key) ||
			mapFields.checkTypeOfFields.array(content,jsonValues, key) ||
			mapFields.checkTypeOfFields.object(content,jsonValues, key) ? boolFieldMapping = true : 0;
		});
		(boolFieldMapping === true) ? mapFields.updateJsons.editor2(jsonValues): alert("Keine Felder gemappt!");
	},
	"checkTypeOfFields": {
		"normalFields" : (field, jsonValues, key) => {
			let arrList;
			if (field !== null && typeof field !== 'object' && !Array.isArray(field)) {
				let checkContent = field.toString().match(/(it\.)[^+]*/gi);
				if (checkContent !== null) {
					arrList = checkContent;
					if (Array.isArray(arrList) && arrList.length) {
						let chainContent = "";
						for (let i = 0; i < arrList.length; i++) {
							chainContent += mapFields.mapNewValue.json(arrList[i]);
							chainContent !== "undefined" ? jsonValues[key] = chainContent : alert(arrList[i] + " ist kein Feld");
						}
						chainContent !== "undefined" ? jsonValues[key] = chainContent : 0;

						return true;
					}
				}
			}
		},
		"object" : (field, jsonValues, key) => {
			let boolCheck = false;
			if (typeof field === 'object' && !Array.isArray(field)) {
				let arrKeyList = [];
				Object.entries(field).forEach(([k, value]) => {
					if(typeof field[k] === "object" && !Array.isArray(field[k])){
						arrKeyList.push([k, field[k]]);
					} else {
						if(Array.isArray(field[k])) {
							mapFields.checkTypeOfFields.array(field[k], jsonValues[key], k) ? boolCheck = true : 0;
						} else {
							mapFields.checkTypeOfFields.normalFields(field[k], jsonValues[key], k);
						}
					}
				});
				for (let i = 0; i < arrKeyList.length; i++) {
					jsonValues[key][arrKeyList[i][0]];
					mapFields.checkTypeOfFields.object(jsonValues[key][arrKeyList[i][0]], jsonValues[key], arrKeyList[i][0]);
				}
				return boolCheck;
			}
		},
		"array" : (field, jsonValues, key) => {
			let checkContent;
			let arrList;
			if(Array.isArray(field)){
				let temp ="";
				for (let j = 0; j < field.length; j++) {
					if(Array.isArray(field[j])){
						mapFields.checkTypeOfFields.array(field[j],jsonValues[key],j);
					} else {						
						if (typeof field[j] === "object" && !Array.isArray(field[j])){
							mapFields.checkTypeOfFields.object(field[j],jsonValues[key],j);
						} else {
							let checkContent = field[j].toString().match(/(it\.)[^+]*/gi);
							if (checkContent !== null) {
								arrList = checkContent;
								if (Array.isArray(arrList) && arrList.length) {
									let chainContent = "";
									for (let i = 0; i < arrList.length; i++) {
										chainContent += mapFields.mapNewValue.json(arrList[i]);
										chainContent !== "undefined" ? jsonValues[key][j] = chainContent : alert(arrList[i] + " ist kein Feld");
									}
		
								}
							}
						}
					}
				}
				return true;
			}
		}
	},
	"mapNewValue": {
		"json": (searchingField) => {
			let contentLeft = mapFields.getJsons.editor();
			let newContent = "";
			let searchField = searchingField.substring(3, searchingField.length).trim();
			searchField = searchField.split(".");
			for (let i = 0; i < searchField.length; i++) {
				if (newContent === "") {
					
					newContent = contentLeft[searchField[i]];

					if (searchField.length === 1) {
						return newContent;
					}
				} else {
					if (!(i === searchField.length - 1)) {
						newContent = newContent[searchField[i]];
						if (Array.isArray(newContent)) {
							let tempLength = newContent.length;
							let tempContent = [];
							for (let j = 0; j < tempLength; j++) {

								if (newContent[j].hasOwnProperty(searchField[i+1])){
									tempContent.push(newContent[j]);
								} else {
									console.log("Array " + j + " von " + searchField[i] + " - Feld (" + searchField[i+1] + ") nicht gefunden");
								}
							}
							if(tempContent.length === 1 && i+1 !== searchField.length -1) {
								newContent = tempContent[0];
							}
							else {
								newContent = "";
								tempContent.forEach((value) => {
									newContent += value[searchField[i+1]] + ", ";
								});
								return newContent.substring(0,newContent.length-2);  //substring entfernt letztes Komma
							}
						}
					} else {
						return newContent = newContent[searchField[i]];
					}
				}
			}
		}
	},
	"getDummyFromMapping": () => {
		let getArray = prompt("In welcher Ebene befindet sich die Liste?").split(".");
		let json = mapFields.getJsons.editor2();
		return json[getArray[0]][getArray[1]][0];
	},
	"goThroughAllObjects": () => {
		let contentFromJson = mapFields.getJsons.editor();

		let getArrayFromJson = document.getElementById('jobFields').value;

		let allJobs = contentFromJson[getArrayFromJson[0]][getArrayFromJson[1]];
		console.log(allJobs);
	}
}