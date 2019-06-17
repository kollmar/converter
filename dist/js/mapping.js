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
		Object.entries(jsonValues).forEach(([key, content]) => {
			let temp;
			
			if (content !== null && typeof content !== 'object' && !Array.isArray(content)) {
				let arrList = content.toString().match(/(it.)[^+]*/gi);
				
				if (Array.isArray(arrList) && arrList.length) {
					jsonValues[key] = mapFields.mapNewValue(arrList);

					boolFieldMapping = true;
				}
			}			
		});
		(boolFieldMapping === true) ? editor2.update(jsonValues) : alert("Keine Felder gemappt!");
		
	},
	"mapNewValue": (searchingField) => {
		
		let contentLeft	= mapFields.getJsons.editor();
		let newContent	= "";	
		let searchField	= searchingField.map(value => value.substring(3, value.length).trim());
		
		searchField.forEach((field) => {
			Object.entries(contentLeft).forEach(([key, value]) => {
				if(mapFields.goThroughObject(contentLeft[key], key) === field){
					newContent += value;
				}
			});
		});
		return newContent;
	},
	"goThroughObject": (objContent, objName) => {
		if(typeof objContent !== 'object') {
			return objName;
		}
		if(typeof objContent === 'object' && !Array.isArray(objContent)) {
			Object.entries(objContent).forEach(([key, _value]) => {
				console.log(key);
				mapFields.goThroughObject(objContent[key], key);
			})
		}
	}
}