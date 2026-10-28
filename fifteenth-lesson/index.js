const express = require('express');
const app = express();
const port = 3000;

const userModel = require('./models/user');
const postModel = require('./models/post');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const USER_ID = "6adde93f1d34391239c92c58";

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        _id: USER_ID,
        username: "ibrahim",
        email: "ibrahim@gmail.com",
        age: 27
    });

    res.json(user);
});

app.get('/createpost', async (req, res) => {
    let post = await postModel.create({
        postdata: "hello sare bhai kaise hai",
        user: USER_ID
    });

    let user = await userModel.findById(USER_ID);

    user.posts.push(post._id);
    await user.save();

    res.json({ post, user });
});

app.get('/finduser', async (req, res) => {
    let user = await userModel
        .findById(USER_ID)
        .populate("posts");

    res.json(user);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
