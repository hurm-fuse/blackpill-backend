const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/postapp");

const userSchema = mongoose.Schema({
    username: String,
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
})

module.exports = mongoose.model("user", userSchema)