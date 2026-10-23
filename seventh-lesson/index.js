const express = require('express');
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    let sitename = "codingwithibu"
    let searchtext = "search now"
    let arr = [90,20,30]
    res.render('index', {sitename: sitename, searchtext: searchtext, arr: arr})
})

app.get('/blog/:slug', (req, res) => {
    let blogtitle = "codingwithibu is good?"
    let blogcontent = "it is very good no doupt"
    res.render('blogpost', {blogtitle: blogtitle, blogcontent: blogcontent})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// npm i ejs
// print variable in html using this <%= sitename %>