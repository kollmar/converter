var fs = require('fs');
var Mapping = require('../../dist/js/mapping');
var request = require('request');
var readContent = fs.readFileSync('test.json');
var jsonContent = JSON.parse(readContent);
var settings = Mapping.mapFields.settings;

request({
	url: jsonContent.url,
	json: true,
	'auth': {
		'user': 'stepstone',
		'pass': 'B@4u3HRsf$jU',
		'sendImmediately': false
	}
}, (err, res, body) => {
	try {
		console.log(res.statusCode + ": " + res.statusMessage);
		if (!err && res.statusCode === 200) {
			settings.typeOfOutput = 'node';
			settings.show = 'output';
			settings.urlJobs = jsonContent.urlJobs;
			settings.dummyField = jsonContent.dummyJobs;
			settings.dummy = jsonContent.dummy;
			settings.contentLeft = body;
			settings.dummy = JSON.parse(JSON.stringify(Mapping.mapFields.addJobsToDummy(Mapping.mapFields.getCountedJobs(), settings.dummy)));
			console.log(Mapping.mapFields.getCountedJobs());
			fs.writeFile("output.json", JSON.stringify(Mapping.mapFields.lookingForRelaxxFields(settings.dummy, settings.show)), function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("The file was saved!");
				}
			});
			// Mapping.mapFields.lookingForRelaxxFields(settings.dummy, settings.show);
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