let util = require("util"),
    http = require("http"),
    path = require("path"),
    url = require("url"),
    filesystem = require("fs"),
    port = 3001;
http.createServer((request, response) => {
  let requestedPath = url.parse(request.url).pathname;
  if (requestedPath === "/") {
    requestedPath = "/index.html";
  }
  let fullPath = process.cwd() + requestedPath;
  console.log("requested", requestedPath);
  console.log(fullPath);
  filesystem.readFile(fullPath, (error, file) => {
    if (error) {
      response.writeHeader(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      if (fullPath.indexOf("api") !== -1) {
        response.writeHeader(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
          "Content-Type": "application/json"
        });
      } else {
        response.writeHeader(200);
      }
      response.write(file, "binary");
      response.end();
    }
  });
}).listen(port);
console.log("running on " + port);