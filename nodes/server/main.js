var fs          = require('fs');
var Mapping     = require('../../dist/js/mapping');
var request     = require('request');
var readContent = fs.readFileSync('test.json');
var jsonContent = JSON.parse(readContent);
var settings	= Mapping.mapFields.settings;
console.log(settings.typeOfOutput);
console.log(settings.show);


request({
	url: jsonContent.url,
	json: true,
}, (err, res, body) => {
	try {
		if (!err && res.statusCode === 200) {
			settings.typeOfOutput = 'node';
			settings.show         = 'output';
			settings.urlJobs      = jsonContent.urlJobs;
			settings.dummyField   = jsonContent.dummyJobs;
			settings.dummy        = jsonContent.dummy;
			settings.contentLeft  = body;
			
			console.log(Mapping.mapFields.addJobsToDummy(Mapping.mapFields.getCountedJobs, jsonContent.dummy));
			// settings.dummy = Mapping.mapFields.addJobsToDummy(Mapping.mapFields.getCountedJobs, jsonContent.dummy);
			// console.log(Mapping.mapFields.lookingForRelaxxFields(settings.dummy, settings.show));
		}
	} catch (err) {
		console.log(err);
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