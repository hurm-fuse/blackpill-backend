const express = require('express');
const app = express()
const port = 3000

app.use(express.static('public')) // it reach public folder

// app.get or app.post or app.put or app.delete(path, handler)
app.get('/', (req, res) => {
  res.sendFile('./index.html')
})

app.get('/about', (req, res) => {
  res.send('Hello World from about page!')
})

app.get('/blog', (req, res) => {
  res.send('Hello World from blog page!')
})

// slug
app.get('/blog/:slug', (req, res) => {
  // console.log(req);
  console.log(req.params);
  console.log(req.query);
  res.send(`hello ${req.params.slug}`)
})

app.get('/contact', (req, res) => {
  res.send('Hello World from contact page!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})