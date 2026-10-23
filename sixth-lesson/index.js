const express = require('express');
const app = express();
const port = 3000;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 1. Normal middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// 2. Authentication middleware
function checkLogin(req, res, next) {
    const isLoggedIn = true; // Demo only

    if (!isLoggedIn) {
        return res.status(401).send('Please login first');
    }
    next();
}

// 3. Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/admin', checkLogin, (req, res) => {
    res.send('Welcome to Admin Panel');
});

app.post('/user', (req, res) => {
    res.json(req.body);
});

// 4. 404 middleware
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
