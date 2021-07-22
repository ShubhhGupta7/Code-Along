const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    college : {
        type: String
    },
    codechef : {
        type : String
    },
    codeforces : {
        type: String
    },
    about : {
        type: String
    }
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User;