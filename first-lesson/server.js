var slugify = require('slugify')

var a = slugify('some string') // some-string
console.log(a);

// if you prefer something other than '-' as separator
var b = slugify('some^@$!!!!!string', '_')  // some_string
console.log(b);

console.log("hello world");
// npm init use for make package.json file and npm init -y do the same work but without asking question
// npm i use for install npm package
// npm start or node server.js use for run a file and server
// on this file we learn to use a node package