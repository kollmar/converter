// include http module in the file
var http = require('http');
var fs = require('fs');
// import test from '../../dist/js/getUrl.js';
var test = require('../../dist/js/getUrl.js');
// var test = require('/var/www/k9559-1/htdocs/dist/js/getUrl.js');

console.log(test.test("www.esgeht.com"));
console.log("www.foobar.de");
// fs.readFile("/var/www/k9559-1/htdocs/index.html", function(err,html) {
// create a server listening on 8087
// http.createServer(function (req, res) {
//     // write the response and send it to the client
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     // res.write("www.foo.de");
//     res.write(test.test("www.foo.de"));
//     // res.write("test");
//     res.end();
// }).listen(8087);

// });