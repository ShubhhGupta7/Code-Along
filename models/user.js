const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const AVATAR_PATH =  path.join('/uploads/users/avatars');

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
    }, 
    avatar: {
        type: String
    }
}, {
    timestamps : true
});

// this method will hide the sensitive details like password of the user user in the userScheama JSON Object 
userSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;

    return user;
}

let storage = multer.diskStorage({
    // cnb -> callbacks
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        // Data.now() - epoc time in milliseconds
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;