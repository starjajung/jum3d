var http = require('http'); // import java.lang... 
var fs = require('fs');

var server = http.createServer( function(req,res){ 
	console.log("call from http client that is a browser");
	console.log(req.url);
	
	// 파일 읽기 file 
	if( req.url == '/')
		req.url = './index.html';
		
	fs.readFile('.' + req.url, function (err, data) {
		if (err) {
			//res.writeHead(404,{'Content-Type':'text/html'}); 
			throw err;
		}
		//console.log(data);
		res.writeHead(200,{'Content-Type':'text/html'}); 
		res.end(data); 
	});
});

server.listen(52273,"10.0.1.81"); 

console.log("Server running at http://10.0.1.81:52273/");


