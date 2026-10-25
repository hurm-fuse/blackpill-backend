const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');

app.set("view engine", "ejs");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.render('index', { image: null });
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.render('index', { image: req.file.filename });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
