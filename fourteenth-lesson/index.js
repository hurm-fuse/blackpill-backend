const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ByteLengthQueuingStrategy } = require('stream/web');

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("Please log in first");
    }

    try {
        const data = jwt.verify(token, "shhhhhhhhhh");

        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
}

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/create', async (req, res) => {
    let { username, email, password, age } = req.body;
    let hashedpassword = await bcrypt.hash(password, 10);
    let createdUser = await userModel.create({
        username: username,
        email: email,
        password: hashedpassword,
        age: age
    })
    let token = jwt.sign({ email }, "shhhhhhhhhh");
    res.cookie("token", token)
    res.json(createdUser)
})

app.get('/login', function (req, res) {
    res.render('login')
});


app.post('/login', async function (req, res) {
    try {
        let user = await userModel.findOne({
            email: req.body.email
        });

        // Check whether user exists
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare entered password with hashed password
        let result = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!result) {
            return res.status(401).send("Invalid email or password");
        }

        // Create JWT token after successful login
        let token = jwt.sign(
            { email: user.email },
            "shhhhhhhhhh"
        );

        res.cookie("token", token);
        return res.redirect("/");

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Server error");
    }
});

app.get('/profile', isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.email}`);
});

app.get('/logout', function (req, res) {
    res.clearCookie("token");
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})