let sumKeysNames = [];

const getKeyNamesFromJson = (json) => {
	let getJsonKeyNames = Object.keys(json.hits.hits[0]._source);

	checkAllKeysInJson(editor.get());
}

const checkAllKeysInJson = (jsonObj) => {
	
	// if (jsonObj !== null && typeof jsonObj === "object") {
	// 	Object.entries(jsonObj).forEach(([key, value]) => {
	// 		this.key = key;
	// 		this.value = value;

	// 		let newObj = {};
	// 		console.log("tet");
	// 		typeof jsonObj[key] === 'object' ? () => {

	// 			newObj[jsonObj[key]] = key;
	// 			console.log(newObj[key]);
	// 			sumKeysNames.push(newObj);
	// 		} : sumKeysNames.push(key);
	// 		checkAllKeysInJson(value);
	// 	});
	// }
	// else {
	// 	sumKeysNames.push("test: " + );
	// }
	

	if (jsonObj !== null && typeof jsonObj == "object") {
		if (Array.isArray(jsonObj)) {
			// console.log(Object.values(jsonObj));
		}
		Object.entries(jsonObj).forEach(([key, value]) => {
			// key ist entweder ein Array Index oder ein Objekt key	
			if (value !== null && typeof value === "object") {
				let newArrObj = [];
				
				Object.entries(value).forEach(([key, v]) => {
					newArrObj.push(key);
				});
				sumKeysNames.push(newArrObj);
			} else {				
				sumKeysNames.push(key);
			}		
			// Rekursion -- Abfrage von weiteren Objekten innerhalb des Obejktes
			checkAllKeysInJson(value);
		});
	} else {
		// jsonObj ist number oder string
		// sumKeysNames.push[Object.keys(json)];
	}	
}

const specificJsonObj = (jsonObj, jobFields) => {
	
	if (jobFields !== "" && typeof jobFields !== "undefined") {
		let arrJobFields = jobFields.split(".");

		// TODO -> Automatisch abfragen
		jsonObj = jsonObj[arrJobFields[0]][arrJobFields[1]][0];
		
		// alert(Object.entries(jsonObj));
	}

	checkAllKeysInJson(jsonObj);
}

