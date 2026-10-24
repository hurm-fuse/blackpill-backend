const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());

const saltRounds = 10;
const myPlaintextPassword = 'ibrahim123';

app.get("/", async function(req, res) {
    try {
        // Password ko hash karo
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        console.log("Hashed password:", hash);

        // Browser mein cookie set karo
        res.cookie("name", "ibrahim");
        res.send("Cookie set and password hashed!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

app.get("/read", function(req, res) {
    // Browser se aayi cookies read karo
    console.log(req.cookies);
    res.send("Check terminal to see cookies");
});

app.get("/check-password", async function(req, res) {
    // Original password aur hash ko compare karo
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const isMatch = await bcrypt.compare(myPlaintextPassword, hash);
    res.send(isMatch ? "Password matches!" : "Password does not match!");
});

app.get("/jwt", function(req, res) {
    let token = jwt.sign({email: "ibu@gmail.com"}, "secret");
    res.cookie("token", token);
    res.send("done")
});

app.get("/readjwt", function(req, res) {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
