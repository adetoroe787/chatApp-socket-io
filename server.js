const http = require('http');
const mime = require('mime')
const fs = require('fs')
const path = require('path')

let cache = {} // cache object is where the contents of cached files are stored

function send404(response){
    response.writeHead(404, {'content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents){
    response.writeHead(
        200, {
            'content-Type': mime.lookup(path.basename(filePath))
        }
    );
    response.end(fileContents)
}