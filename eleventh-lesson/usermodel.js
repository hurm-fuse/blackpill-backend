const mongoose = require('mongoose');
const { stringify } = require('node:querystring');
// it creat a collection:
mongoose.connect(`mongodb://localhost:27017/myusers`)
// creat schema:
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
});
// export the schema
module.exports = mongoose.model('user', userSchema);