var fs          = require('fs');
var Mapping     = require('../../dist/js/mapping');
var request     = require('request');
var readContent = fs.readFileSync('test.json');
var jsonContent = JSON.parse(readContent);

console.log(Mapping.mapFields.settings.typeOfOutput);
console.log(Mapping.mapFields.settings.show);


request({
	url: jsonContent.url,
	json: true,
}, function (err, res, body) {
	if (!err && res.statusCode === 200) {
		console.log(body);
	}
});

// console.log(readContent.toString());

// console.log("Read Output content: \n " + readContent);

// fs.writeFile("setting.json", "Hey there!" + Math.random(), function(err) {
// if(err) {
// return console.log(err);
// }
// console.log("The file was saved!");
// });