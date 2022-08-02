const http = require("http");
const mime = require("mime");
const fs = require("fs");
const path = require("path");

let cache = {}; // cache object is where the contents of cached files are stored

// 404 helper function
function send404(response) {
  response.writeHead(404, { "content-Type": "text/plain" });
  response.write("Error 404: resource not found.");
  response.end();
}

// Sendfile helper function
function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {
    "content-Type": mime.lookup(path.basename(filePath)),
  });
  response.end(fileContents);
}

// Server Static files
function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    // Check if file is cached in memory
    sendFile(response, absPath, cache[absPath]); // Serve file from memory
  } else {
    fs.exists(absPath, function (exists) {
      if (exists) {
        // Check if file exists
        fs.readFile(absPath, function (err, data) {
          // Read file from disk
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data); // Server file read from disk
          }
        });
      } else {
        send404(response);
      }
    });
  }
}
