const express = require('express');
const app = express()
const port = 3000
const blog = require('./routes/blog.js')
const shop = require('./routes/shop.js')

app.use(express.static('public'))
app.use('/blog', blog)
app.use('/shop', shop)

// get request
app.get('/', (req, res) => {
    console.log("hey it's a get request");
    res.send('Hello World!')
})

// post request - help us to send sensetive data
app.post('/', (req, res) => {
    console.log("hey it's a post request");
    res.send('Hello World from post request!')
})

// put request - help us to update page
app.put('/', (req, res) => {
    console.log("hey it's a put request");
    res.send('Hello World from put request!')
})

// send html files
app.get('/index', (req, res) => {
    console.log("hey it's a get request but with html file");
    res.sendFile('templates/index.html', {root: __dirname})
})

// serve json
app.get('/api', (req, res) => {
    console.log("hey it's a get request but with json");
    res.json({a:1,b:2,c:3,name:['harry', 'ibrahim']});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
