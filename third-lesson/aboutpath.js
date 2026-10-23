const path = require("path");

// Example file path
const mypath = "/workspaces/blackpill-backend/third-lesson/main.js";

// Get the file name
console.log(path.basename(mypath)); // main.js
 
// Get the folder path
console.log(path.dirname(mypath)); // /workspaces/blackpill-backend/third-lesson

// Get the file extension
console.log(path.extname(mypath)); // .js

// Get the file name without extension
console.log(path.parse(mypath).name); // main

// Get all parts of the path
console.log(path.parse(mypath)); // root, dir, base, ext, name

// Create a path by joining parts
console.log(path.join("folder", "files", "data.txt")); // folder/files/data.txt

// Convert a relative path into an absolute path
console.log(path.resolve("data.txt")); // Absolute path from current working directory

// Clean unnecessary dots and parent-folder segments
console.log(path.normalize("/users/./ibrahim/../data.txt")); // /users/data.txt

// Check whether a path is absolute
console.log(path.isAbsolute(mypath)); // true

// Get the relative path between two locations
console.log(path.relative("/users/ibrahim", "/users/ibrahim/projects")); // projects

// Create a path from an object
console.log(path.format({
    dir: "/users/ibrahim",
    name: "main",
    ext: ".js"
})); // /users/ibrahim/main.js

// Get the operating system's path separator
console.log(path.sep); // / on Linux/macOS, \ on Windows

// Get the environment variable path delimiter
console.log(path.delimiter); // : on Linux/macOS, ; on Windows

// Use Windows-style path operations
console.log(path.win32.basename("C:\\Users\\main.js")); // main.js

// Use POSIX-style path operations
console.log(path.posix.basename("/users/main.js")); // main.js