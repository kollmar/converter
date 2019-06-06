const getKeyNamesFromJson = (json) => {

	let getJsonKeyNames = Object.keys(json.hits.hits[0]._source);

	// for (const name of getJsonKeyNames) {
	// 	console.log("Name: " + name + " inhalt: " + getJsonKeyNames[name]);
	// }

	console.log(typeof json);
	console.log(typeof getJsonKeyNames[0]);
	console.table(JSON.stringify(getJsonKeyNames));
	console.log(typeof JSON.stringify(json));

	// console.log(JSON.stringify(json));

	// checkAllKeysInJson(json);
}

const checkAllKeysInJson = (json) => {
	let sumJsonKeys = [];
	let temp;
	let checkedJSON = false;

	

}

