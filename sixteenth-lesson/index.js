// 1. Express aur Multer ko import kar rahe hain.
const express = require('express');
const multer = require('multer');

// 2. Express application create kar rahe hain.
const app = express();

// 3. Server port set kar rahe hain.
const port = 3000;

// 4. HTML files ko public folder se serve karenge.
// Isse /index.html browser mein open ho sakta hai.
app.use(express.static('public'));

// 5. Multer configuration.
// dest batata hai ki uploaded files kahan save hongi.
const upload = multer({
    dest: 'uploads/',

    // Upload limits lagana important hai.
    limits: {
        fileSize: 2 * 1024 * 1024, // Har file maximum 2 MB
        files: 5,                  // Ek request mein max 5 files
        fields: 10,                // Max 10 text fields
        parts: 15                  // Max 15 total multipart parts
    }
});


// ========================================
// METHOD 1: upload.single()
// ========================================

// 'avatar' naam ke field se ek file accept hogi.
app.post('/upload-single', upload.single('avatar'), (req, res) => {

    // Single file ka object req.file mein milta hai.
    console.log('Single file:', req.file);

    // Text fields req.body mein milte hain.
    console.log('Text data:', req.body);

    // Agar file nahi aayi, toh undefined ho sakta hai.
    if (!req.file) {
        return res.status(400).send('Please select a file.');
    }

    res.send(`Uploaded file: ${req.file.filename}`);
});


// ========================================
// METHOD 2: upload.array()
// ========================================

// 'photos' field se maximum 5 files accept hongi.
app.post('/upload-array', upload.array('photos', 5), (req, res) => {

    // Array of file objects req.files mein milega.
    console.log('Multiple files:', req.files);

    res.send(`${req.files.length} file(s) uploaded.`);
});


// ========================================
// METHOD 3: upload.fields()
// ========================================

// Do alag field names accept kar rahe hain.
app.post(
    '/upload-fields',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'documents', maxCount: 3 }
    ]),
    (req, res) => {

        // req.files ek object hota hai.
        // Har field ke andar files ki array hoti hai.
        console.log('Avatar:', req.files.avatar);
        console.log('Documents:', req.files.documents);

        res.send('Avatar/documents upload request completed.');
    }
);


// ========================================
// METHOD 4: upload.none()
// ========================================

// Ye route sirf text fields accept karta hai.
// File bhejne par Multer error dega.
app.post('/upload-none', upload.none(), (req, res) => {

    // Form ka text data req.body mein milega.
    console.log('Text fields:', req.body);

    res.send(`Hello, ${req.body.username || 'user'}!`);
});


// ========================================
// METHOD 5: upload.any()
// ========================================

// Kisi bhi field name se files accept ho sakti hain.
// Is method ko sirf is specific route par use kar rahe hain.
app.post('/upload-any', upload.any(), (req, res) => {

    // Sab uploaded files ek array mein milengi.
    console.log('Any-field files:', req.files);

    res.send(`${req.files.length} file(s) uploaded.`);
});


// ========================================
// ERROR HANDLER
// ========================================

// Multer ki file-size ya file-count limit jaise errors
// ko handle karne ke liye middleware.
app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        return res.status(400).send(`Upload error: ${err.message}`);
    }

    // Doosre errors ko generic server error ki tarah handle karo.
    console.error(err);
    res.status(500).send('Something went wrong on the server.');
});


// ========================================
// START SERVER
// ========================================

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});