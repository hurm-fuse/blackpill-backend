const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const userModel = require('./models/user.js');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended:true }));;
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index");
})

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", {users});
})

app.post('/create', async (req, res) => {
    let createdUser = await userModel.create({
        image: req.body.image,
        email: req.body.email,
        name: req.body.name
    })

    res.send(createdUser)
})

app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.id});
    res.render('edit', {user})
})

app.post('/update/:id', async (req, res) => {
    const {image, name, email} = req.body;
    await userModel.findByIdAndUpdate({_id: req.params.id}, {image,name,email}, {new:true});
    res.redirect('/read')
})

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})