const http = require('http');
const mime = require('mime')
const fs = require('fs')
const path = require('path')

let cache = {} // cache object is where the contents of cached files are stored