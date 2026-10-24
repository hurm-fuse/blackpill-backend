const express = require('express');
const app = express()
const port = 3000
const userModel = require('./usermodel')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/createuser', async (req, res) => {
    let createduser = await userModel.create({
        name: "ibrahim",
        email: "ibu@gmail.com",
        username: "ibrahim_ahmad"
    })

    res.send(createduser);
})

app.get('/updateuser', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate(
        { username: "ibrahim_ahmad" },
        { username: "maaz" },
        { new: true }
    );
    res.send(updatedUser);
})

app.get('/readuser', async (req, res) => {
    // find all user
    let readUser = await userModel.find();
    // find particular user
    let readoneUser = await userModel.findOne({username: "maaz"});
    res.send(readUser);
    res.send(readoneUser);
})

app.get('/delete', async (req, res) => {
    // find particular user and delete
    let deleteoneUser = await userModel.findOneAndDelete({name: "ibrahim"});
    res.send(deleteoneUser);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})