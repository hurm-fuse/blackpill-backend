// working with file
const fs = require("fs");
console.log(fs);
console.log("starting");

// make a file and write something
fs.writeFileSync("harry.txt", "harry is a good coder")
console.log("ending");

fs.writeFile("harry2.txt", "harry is a good coder+progammer", () => {
    console.log("done");
    // help to read the file
    fs.readFile("harry2.txt", (error, data) => {
        console.log(error, data.toString()); // i use to string because this thing give file data into lang characters
    })
});

// fs.appendFile() adds new content to the end of an existing file without deleting its previous content; if the file doesn't exist, it creates a new one.
fs.appendFile("harry.txt", " this statement is not corrent", (e,d)=>{
    console.log(d);
})