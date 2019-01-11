let util = require("util"),
    http = require("http"),
    path = require("path"),
    url = require("url"),
    filesystem = require("fs"),
    port = 3001;
const respond = (response, options, content) => {
  response.writeHeader(200, options);
  response.write(content);
  response.end();
};
const respondError = (response, error) => {
  response.writeHeader(500, {"Content-Type": "text/plain"});
  response.write(error + "\n");
  response.end();
};
const respondFile = (response, options, file) => {
  response.writeHeader(200, options);
  response.write(file, "binary");
  response.end();
};
const writeFile = (filepath, content) => {
  let success = true;
  filesystem.writeFile(filepath, content, error => {
    if (error) {
      success = false;
    }
  });
  return success;
};
http.createServer((request, response) => {
  let requestedPath = url.parse(request.url).pathname;
  if (requestedPath === "/") {
    requestedPath = "/index.html";
  }
  switch (requestedPath) {
    case "/api/setalarm":
      try {
        let query = url.parse(request.url).query;
        let decoded = decodeURIComponent(query);
        let json = JSON.parse(decoded);
        if (json.hour === undefined || json.minute === undefined || !Number.isInteger(json.hour) || !Number.isInteger(json.minute)) {
          throw new Error("hour or minute is not defined");
        }
        respond(response, {"Content-Type": "application/json"},
            "{\"success\":" + writeFile("/api/alarm.json", decoded)
            + ",\"json\":" + decoded + "}\n");
        break;
      } catch (error) {
        respond(response, {"Content-Type": "application/json"},
            "{\"success\":false}\n");
        break;
      }
    case "/api/sensor.json":
    case "/api/email.json":
    case "/api/calendar.json":
      let fullPath = process.cwd() + requestedPath;
      filesystem.readFile(fullPath, (error, file) => {
        if (error) {
          respondError(response, error);
        } else {
          respondFile(response,
              {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Content-Type": "application/json"
              },
              file);
        }
      });
      break;
    case "/":
    default:
      filesystem.readFile(process.cwd() + "/index.html", (error, file) => {
        if (error) {
          respondError(response, error);
        } else {
          respondFile(response, {"Content-Type": "text/plain"}, file);
        }
      });
  }
  console.log("requested", requestedPath);
}).listen(port);
console.log("Running webserver on port " + port);