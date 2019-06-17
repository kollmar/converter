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

		console.log(contentLeft);
		console.log(contentRight);

		Object.values(contentRight).forEach((content) => {
			let temp;
			console.log(content);
			
			// (content !== null) ? () => {
				let arrList = content.toString().match(/(it.)[^+]*/gi);			
	
				if (Array.isArray(arrList) && arrList.length > 1 && arrList.length) {
					for (let i = 0; i < arrList.length; i++) {
						alert('relaxx-Feld erkannt: ' + arrList[i]);						
					}
				}
				else {
					if (Array.isArray(arrList) && arrList.length) {
						alert('relaxx-Feld erkannt: ' + arrList[0]);
					}
					else {
						console.log("Keine relaxx-Felder hinterlegt.");
					}
				}
			// } : console.log("Wert ist null");

		});


	},
	"getChanges": () => {
		alert(this.editor2);
	}
}