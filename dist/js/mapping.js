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
	"getArrayOfDummyField": () => {
		return document.getElementById('dummyFields').value.split('.');
	},
	"getCountedJobs": () => {
		let contentLeft = mapFields.getJsons.editor();

		let getArrayOfJobs = document.getElementById('jobFields').value;

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
	"addJobsToDummy": (_counter) => {
		let counter = _counter;
		let contentRight = mapFields.getJsons.editor2();
		// let newContentRight = "";
		let newContentRight = contentRight;
		let contentRightObject = mapFields.getDummyFromMapping();
		let getDumArrFlds = mapFields.getArrayOfDummyField();

		getDumArrFlds.forEach((value) => {
			// newContentRight = contentRight[value];
			newContentRight = newContentRight[value];
		});
		// let countDummy = newContentRight.length;

		// Array wird komplett geleert, da bei der variante var x = [] das referenzierte Objekt nicht geleert. https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/ 
		newContentRight.length = 0;
		for (let i = 0; i < counter; i++) {
			newContentRight.push(contentRightObject);
		}

		return contentRight;
	},
	"changeContent": () => {
		let newContent;

		mapFields.updateJsons.editor2(mapFields.addJobsToDummy(mapFields.getCountedJobs()));
		newContent = mapFields.getJsons.editor2();

		// let dummyFields = mapFields.getArrayOfDummyField();
		// dummyFields.forEach((value) => {
		// 	newContent = contentRight[value];
		// });

		// for (let i = 0; i < newContent['job'].length; i++) {
		// mapFields.lookingForRelaxxFields(newContent['job'][i]);
		// console.log(newContent['job'][i]);
		// }
		// newContent.job[0].city = "MEgathron";
		// mapFields.updateJsons.editor2(newContent);
		mapFields.lookingForRelaxxFields(newContent);
	},
	"getChanges": () => {
		alert(this.editor2);
	},
	"lookingForRelaxxFields": (jsonValues) => {
		let boolFieldMapping = false;
		let getDumArrFlds	 = mapFields.getArrayOfDummyField();
		let newjsonValues 	 = jsonValues;
		getDumArrFlds.forEach((value) => {
			newjsonValues 	 = newjsonValues[value];
		});

		newjsonValues.forEach((value, index, array) => {
			Object.entries(newjsonValues[index]).forEach(([key, content], ind, arr) => {
				mapFields.checkTypeOfFields.normalFields(content, newjsonValues[index], key, index) ||
				mapFields.checkTypeOfFields.array(content, newjsonValues[index], key, index) ||
				mapFields.checkTypeOfFields.object(content, newjsonValues[index], key, index) ? boolFieldMapping = true : 0;
			});
		});
		(boolFieldMapping === true) ? mapFields.updateJsons.editor2(jsonValues): alert("Keine Felder gemappt!");

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
							chainContent += mapFields.mapNewValue.json(arrList[i], indexOfField);
							chainContent !== "undefined" ? jsonValues[key] = chainContent : alert(arrList[i] + " ist kein Feld");
						}
						chainContent !== "undefined" ? jsonValues[key] = chainContent : 0;

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
							// mapFields.checkTypeOfFields.normalFields(field[k], jsonValues[key], k, indexOfField);
							mapFields.checkTypeOfFields.normalFields(field[k], jsonValues, k, indexOfField);
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
										chainContent += mapFields.mapNewValue.json(arrList[i], indexOfField);
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
		"json": (searchingField, indexOfField) => {
			let contentLeft = mapFields.getJsons.editor();
			let newContentLeft = contentLeft;
			let newContent = "";
			let searchField = searchingField.substring(4, searchingField.length).trim().split(".");
			const getArrJobFields = document.getElementById('jobFields').value.split('.');

			getArrJobFields.forEach((value) => {
				newContentLeft = newContentLeft[value];
			});

			for (let i = 0; i < searchField.length; i++) {
				if (newContent === "") {

					newContent = newContentLeft[indexOfField][searchField[i]];

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
						return newContent = newContent[searchField[i]];
					}
				}
			}
		}
	},
	"getDummyFromMapping": () => {
		let getArray = mapFields.getArrayOfDummyField();
		if (getArray === '') {
			getArray = prompt("In welcher Ebene befindet sich die Liste?").split(".");
		}
		let json = mapFields.getJsons.editor2();

		if (getArray.length === 1) {
			return json[getArray[0]][0];
		} else {
			for (let i = 0; i < getArray.length; i++) {
				json = json[getArray[i]];
			}
			return json[0];
		}
	},
	"goThroughAllObjects": () => {
		let contentFromJson = mapFields.getJsons.editor();

		let getArrayFromJson = document.getElementById('jobFields').value;

		let allJobs = contentFromJson[getArrayFromJson[0]][getArrayFromJson[1]];
		console.log(allJobs);
	}
}