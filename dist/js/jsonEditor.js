"use strict";
// create the editor
var container,
	container2,
	options,
	json,
	editor,
	editor2,
	temp;

container = document.getElementById("jsoneditor");
container2 = document.getElementById("jsoneditor2");

options = {
	mode: 'tree',
	modes: ['code', 'form', 'text', 'tree', 'view']
};

editor = new JSONEditor(container, {
	mode: 'view',
	modes: ['view', 'text', 'code']
});
editor2 = new JSONEditor(container2, options);
// set json
json = {
	"publisher": "Super X Job Site",
	"publisherurl": "http://www.superxjobsite.com",
	"lastBuildDate": "Fri, 10 Dec 2004 22:49:39 GMT",
	"job": 
	[		
		{
			"title": "!it._source.location.city.()",
			"date": "!it._source.releaseDateBegin",
			"referencenumber": "unique123131",
			"url": "http://www.superxjobsite.com/viewjob.cfm?jobid=unique123131",
			"company": "Big ABC Corporation",
			"city": "Phoenix",
			"state": "AZ",
			"country": "US",
			"postalcode": "85003",
			"description": [
				{
					"test":"!it._id"
				},
				"!it._source.dynamicContent.label_aufgaben.value + !it._source.dynamicContent.label_profil.value + !it._source.dynamicContent.label_wir_bieten.value"
			],
			"salary": "$70K per year",
			"education": "Bachelors",
			"jobtype": "fulltime",
			"category": "Sales Management, Executive",
			"experience": "5+ years"
		},		
		{
			"title": "Sales Manager",
			"date": "Thu, 9 Dec 2005 17:06:32 GMT",
			"referencenumber": "!it._id",
			"url": "http://www.superxjobsite.com/viewjob.cfm?jobid=unique123130",
			"company": "Small DEF Company",
			"city": "Austin",
			"state": "TX",
			"country": "US",
			"postalcode": "78757",
			"description": "Do you love to sell? Do you love to lead? Do you\nlove to lead people selling? Are you ready for an exciting and\nhigh-speed career in sales? If so, we want to hear from you!\n\nWe are a small, unique, and fun company that's going to make big things\nhappen. If you're looking for something a little bit different, come\nhelp us change the world!",
			"salary": "$50K per year",
			"jobtype": "fulltime",
			"experience": "3+ years"
		},		
		{
			"title": "Account Manager",
			"date": "Thu, 9 Dec 2005 16:42:19 GMT",
			"referencenumber": "unique123129",
			"url": "http://www.superxjobsite.com/viewjob.cfm?jobid=unique123129",
			"company": "Big ABC Corporation",
			"city": "Phoenix",
			"state": "AZ",
			"country": "US",
			"postalcode": "85003",
			"description": "Responsible for managing large corporate accounts.\nResponsibilities include: Resolving customer issues, ensuring timely\ninventory restocks, and coordinating with marketing and operations to\nimplement new marketing programs.\n\nWe provide competitive compensation, including stock options and a full\nbenefit plan. As a fast-growing business, we offer excellent\nopportunities for exciting and challenging work. As our company\ncontinues to grow, you can expect unlimited career advancement!",
			"salary": "$40K per year",
			"education": "Bachelors",
			"jobtype": "fulltime",
			"category": "Account Mgmt",
			"experience": "2+ years"
		}
	]
};

const jsonDummy = () => {

	// fetch("/converter/test_relaxx_json.json")
	fetch("/test_relaxx_json.json")
	.then(res => res.json())
	.then((urlJsonData) => {
		editor.update(urlJsonData);
	}).catch((err) => {
		fetch("http://localhost:8080/test_relaxx_json.json")
		.then(res => res.json())
		.then((urlJsonData) => {
			editor.update(urlJsonData);
		})
		.catch((err) => {
			console.log(err);
				fetch("/converter/test_relaxx_json.json")
				// fetch("http://localhost:8080/test_relaxx_json.json")
				.then(res => res.json())
				.then((urlJsonData) => {
					editor.update(urlJsonData);
				})
				.catch(err => console.log(err));
			});
	})
		
};

jsonDummy();
editor2.set(json);

// get json
// json = editor.get();

const uploadButton = document.querySelector('.browse-btn');
const fileInfo = document.querySelector('.file-info');
const realInput = document.querySelector('.real-input');

uploadButton.addEventListener('click', (e) => {
  realInput.click();
});

realInput.addEventListener('change', () => {
  const name = realInput.value.split(/\\|\//).pop();
  fileInfo.innerHTML = name;
});