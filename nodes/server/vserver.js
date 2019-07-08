var http = require('http');
var fs = require('fs');
var nStatic = require('node-static');

var fileServer = new nStatic.Server('./../../');

http.createServer( function ( request, response ) {
	// if (request.url= '/'){
			// fileServer.serve( request, response );
			// response.writeHead({"Access-Control-Allow-Origin": "*"});
		// response.end(fileServer.serve( request, response ));
		response.writeHead(200, { 'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*" });
		response.write("foo");
		response.end();
	// 	fs.readFile('./../../index.html', (err, data) => {
	// 		if (err) throw err;
	// 		const readableData = String(data);
	// 		response.writeHead(200, {'Content-Type': 'text/plain'});
	// 		response.write(readableData);
	// 		response.end();
	// 	})
	// }

	if(request.url === '/click'){
		response.writeHead(401, { 'Content-Type': 'text/html' });
		response.write("bar");
		response.end();
	}	
} ).listen(8888);