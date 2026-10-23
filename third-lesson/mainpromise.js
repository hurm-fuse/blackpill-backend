const fs = require("fs").promises;
async function main() {
    let b = await fs.appendFile(
        "harry.txt",
        "\n\n\n\nThis is amazing promise"
    );
    let a = await fs.readFile("harry.txt");
    console.log(a.toString(), b);
}
main();