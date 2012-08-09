var util = require("util"),
        http = require("http"),
        url = require("url"),
        path = require("path"),
        fs = require("fs");


http.createServer(function (request, response) {
        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);
        util.puts("filename : " + filename);
        path.exists(filename, function(exists){
                if(!exists){
                        response.sendHeader(404,{"Content-type":"text/plain"} );
                        response.write("404 Not Found\n");
                        response.close();
                        return;
                }

                fs.readFile(filename, function(err, data){
                        if(err){
                                console.log("error!!!");
                                response.writeHead(500, {"Content-type":"text/plain"});
                                response.write(err + "\n");
                                response.end();
                                return;
                        }

                        util.puts("data : " + data);
                        response.statusCode = 200;
                        response.write(data, "binary");
                        response.end();
                });
        });
}).listen(8080);