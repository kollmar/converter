"use strict";

const mapFields = {
	"settings": {
		"typeOfOutput":"html",
		"contentLeft" :"",
		"urlJobs":"",
		"dummyField": "",
		"dummy":"",
		"show": "editor",
	},
	"dummyVar": [],
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
	"dummyField": {
		"get": () => {
			return (mapFields.settings.typeOfOutput === 'html') ? 
					document.getElementById('dummyFields').value 
					: mapFields.settings.dummyField;
		},
		"set": (newField) => {
			document.getElementById('dummyFields').value = newField;
		}
	},
	"getArrayOfDummyField": () => {
		// TODO Hier muss noch was angepasst werden. Die Abfrage funktioniert nocht nicht 100%
		let getDumFld = mapFields.dummyField.get();
		
		if (getDumFld === "") {
			mapFields.dummyField.set(prompt("In welcher Ebene befindet sich die Liste?").split("."));			
			getDumFld = mapFields.dummyField.get();
		}
		
		return getDumFld = getDumFld.split('.');
		// if (mapFields.dummyVar.length) {
		// 	return mapFields.dummyVar;
		// } else {
		// 	return getDumArrFlds;
		// }
	},
	"getCountedJobs": () => {
		let contentLeft    = "";
		let getArrayOfJobs = "";
		let typeOfOutput   = mapFields.settings.typeOfOutput;

		if (typeOfOutput === 'html') {
			contentLeft    = mapFields.getJsons.editor();
			getArrayOfJobs = document.getElementById('jobFields').value;
		} else {
			contentLeft    = mapFields.settings.contentLeft;
			getArrayOfJobs = mapFields.settings.urlJobs;
		}

		if (getArrayOfJobs !== "") {
			getArrayOfJobs = getArrayOfJobs.split('.');

			getArrayOfJobs.forEach((value) => {
				contentLeft = contentLeft[value];
			});

			return contentLeft.length;
		} else {
			return 1;
		}
	},
	"addJobsToDummy": (_counter, _dummyContent) => {
		let counter 			= _counter;
		let contentRight 		= _dummyContent;
		let newContentRight 	= contentRight;
		let contentRightObject 	= mapFields.getDummyFromMapping();
		let getDumArrFlds 		= mapFields.getArrayOfDummyField(mapFields.typeOfOutput);

		getDumArrFlds.forEach((value) => {
			newContentRight = newContentRight[value];
		});

		// Array wird komplett geleert, da bei der variante var x = [] das referenzierte Objekt nicht geleert. https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/ 
		newContentRight.length 	= 0;
		for (let i = 0; i < counter; i++) {
			newContentRight.push(contentRightObject);
		}

		return contentRight;
	},
	"changeContent": () => {
		let newContent;		
		if (mapFields.settings.typeOfOutput === 'html') {
			console.time('changeContent');
			mapFields.updateJsons.editor2(mapFields.addJobsToDummy(mapFields.getCountedJobs(), mapFields.getJsons.editor2()));
			console.timeEnd('changeContent');
			newContent = mapFields.getJsons.editor2();
		} else {
			newContent = mapFields.settings.dummy;
		}

		return mapFields.lookingForRelaxxFields(newContent, mapFields.settings.show);
	},
	"getChanges": () => {
		alert(this.editor2);
	},
	"lookingForRelaxxFields": (jsonValues, show) => {
		let boolFieldMapping 	= false;
		let typeOfOutput = mapFields.settings.typeOfOutput;
		let getDumArrFlds 		= mapFields.getArrayOfDummyField();
		let newjsonValues 		= jsonValues;
		
		getDumArrFlds.forEach((value) => {
			newjsonValues = newjsonValues[value];
		});
		
		newjsonValues.forEach((value, index, array) => {
			console.time('Objekt ' + index + ' durchgegangen!');
			Object.entries(newjsonValues[index]).forEach(([key, content], ind, arr) => {
				
				mapFields.checkTypeOfFields.normalFields(content, newjsonValues[index], key, index) ||
				mapFields.checkTypeOfFields.array(content, newjsonValues[index], key, index) ||
				mapFields.checkTypeOfFields.object(content, newjsonValues[index], key, index) ? boolFieldMapping = true : 0;
				
				mapFields.checkTypeOfFields.normalFields(content, newjsonValues[index], key, index) ? boolFieldMapping = true : 0;
			});
			console.timeEnd('Objekt ' + index + ' durchgegangen!');
		});
		
		if (boolFieldMapping === true) {
			if (show === 'editor') {
				mapFields.updateJsons.editor2(jsonValues);
				return true;
			}
			else {
				return jsonValues;
			}
		} else {
			if(typeOfOutput === 'html') {
				alert("Keine Felder gemappt!");
			} else {
				console.log("Keine Felder gemappt");
			}
		}
	},
	"checkTypeOfFields": {
		"normalFields": (field, jsonValues, key, indexOfField) => {
			let arrList;
			if (field !== null && typeof field !== 'object' && !Array.isArray(field)) {
				let checkContent = field.toString().match(/(!it\.)[^+]*/gi);
				if (checkContent !== null) {
					arrList = checkContent;
					if (Array.isArray(arrList) && arrList.length) {
						let chainContent = "";
						for (let i = 0; i < arrList.length; i++) {
							// prüft, ob im Feld eine () hinterlegt ist, dass Signal um den Text in Bereiche aufzuteilen
							let checkForArrow  = arrList[i].indexOf("()");

							chainContent += mapFields.mapNewValue.json(arrList[i], indexOfField) + " ";
							if (checkForArrow > -1) {
								let splitChainContent = chainContent.split(", ");
								if (1 < splitChainContent.length){
									splitChainContent.forEach((value, index, arr) => {
										jsonValues[key + (index + 1)] = value;
									});
									// löscht den alten, da die neuen Objekt Properties angelegt wurden 
									delete jsonValues[key];
								} else {
									chainContent !== "undefined" ? jsonValues[key] = chainContent.trim() : alert(arrList[i] + " ist kein Feld");	
								}

							} else {
								chainContent !== "undefined" ? jsonValues[key] = chainContent.trim() : alert(arrList[i] + " ist kein Feld");
							}
						}

						return true;
					}
				}
			}
		},
		"object": (field, jsonValues, key, indexOfField) => {
			let boolCheck = false;
			if (field !== null && typeof field === 'object' && !Array.isArray(field)) {
				let arrKeyList = [];
				Object.entries(field).forEach(([k, value]) => {
					if (typeof field[k] === "object" && !Array.isArray(field[k])) {
						arrKeyList.push([k, field[k]]);
					} else {
						if (Array.isArray(field[k])) {
							mapFields.checkTypeOfFields.array(field[k], jsonValues[key], k, indexOfField) ? boolCheck = true : 0;
						} else {
							mapFields.checkTypeOfFields.normalFields(field[k], field, k, indexOfField);	
						}
					}
				});
				for (let i = 0; i < arrKeyList.length; i++) {
					jsonValues[key][arrKeyList[i][0]];
					mapFields.checkTypeOfFields.object(jsonValues[key][arrKeyList[i][0]], jsonValues[key], arrKeyList[i][0], indexOfField);
				}
				return boolCheck;
			}
		},
		"array": (field, jsonValues, key, indexOfField) => {
			let checkContent;
			let arrList;
			if (Array.isArray(field)) {
				let temp = "";
				for (let j = 0; j < field.length; j++) {
					if (Array.isArray(field[j])) {
						mapFields.checkTypeOfFields.array(field[j], jsonValues[key], j, indexOfField);
					} else {
						if (typeof field[j] === "object" && !Array.isArray(field[j])) {
							mapFields.checkTypeOfFields.object(field[j], jsonValues[key], j, indexOfField);
						} else {
							let checkContent = field[j].toString().match(/(!it\.)[^+]*/gi);
							if (checkContent !== null) {
								arrList = checkContent;
								if (Array.isArray(arrList) && arrList.length) {
									let chainContent = "";
									for (let i = 0; i < arrList.length; i++) {
										let checkForArrow  = arrList[i].match(/.\(\)/);
										chainContent += mapFields.mapNewValue.json(arrList[i], indexOfField) + " ";
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
		"json": (_searchingField, _indexOfField) => {
			let contentLeft,
				newContentLeft,
				getArrJobFields,
				searchField,
				lookingForArr,
				newContent      = null,
				searchingField 	= _searchingField,
				indexOfField 	= _indexOfField;

			if (mapFields.settings.typeOfOutput === 'html') {
				contentLeft 		= mapFields.getJsons.editor();
				getArrJobFields 	= document.getElementById('jobFields').value.split('.');
			} else {
				contentLeft			= mapFields.settings.contentLeft;
				getArrJobFields		= mapFields.settings.urlJobs.split('.');
			}
			searchField 		= searchingField.substring(4, searchingField.length).trim().split(".");
			lookingForArr 		= searchField.indexOf('()');
			newContentLeft 		= contentLeft;
			
			if (lookingForArr > -1) {
				searchField.splice(lookingForArr, 1);
			}
			getArrJobFields.forEach((value) => {
				newContentLeft = newContentLeft[value];
			});
			
			for (let i = 0; i < searchField.length; i++) {
				if (newContent === null) {
					newContent = newContentLeft[indexOfField][searchField[i]];

					if (searchField.length === 1) {
						return newContent;
					}
					if (newContent === "undefined") {
						return newContent = "";
					}
				} else {
					if (!(i === searchField.length - 1)) {
						newContent = newContent[searchField[i]];
						if (Array.isArray(newContent)) {
							let tempLength 	= newContent.length;
							let tempContent = [];
							for (let j = 0; j < tempLength; j++) {

								if (newContent[j].hasOwnProperty(searchField[i + 1])) {
									tempContent.push(newContent[j]);
								} else {
									console.log("Array " + j + " von " + searchField[i] + " - Feld (" + searchField[i + 1] + ") nicht gefunden");
								}
							}
							if (tempContent.length === 1 && i + 1 !== searchField.length - 1) {
								newContent = tempContent[0];
							} else {
								newContent = "";
								tempContent.forEach((value) => {
									newContent += value[searchField[i + 1]] + ", ";
								});
								return newContent.substring(0, newContent.length - 2); //substring entfernt letztes Komma
							}
						}
					} else {
						return newContent == null ? newContent = "" : newContent = newContent[searchField[i]];
					}
				}
			}
		}
	},
	"getDummyFromMapping": () => {
		let getArray     = mapFields.getArrayOfDummyField();
		let typeOfOutput = mapFields.settings.typeOfOutput
		let json         = "";

		if(typeOfOutput === 'html') {
			json = mapFields.getJsons.editor2();
		} else {
			json = mapFields.settings.dummy; 
		}

		try {
			if (getArray.length === 1) {
				return json[getArray[0]][0];
			} else {
				for (let i = 0; i < getArray.length; i++) {
					json = json[getArray[i]];
				}
				return json[0];
			}
		} catch(e) {
			console.log(mapFields.dummyField.get() + " wurde nicht gefunden");
			if(typeOfOutput === 'html') {
				mapFields.dummyField.set("");
			}
		};	
	},
	"goThroughAllObjects": () => {
		let contentFromJson  = mapFields.getJsons.editor();
		let getArrayFromJson = document.getElementById('jobFields').value;

		let allJobs = contentFromJson[getArrayFromJson[0]][getArrayFromJson[1]];
		console.log(allJobs);
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.mapFields = mapFields;
}