const User = require('../models/user');

module.exports.profile = function(req, res) {

    return res.render('user', {
        title : 'User'
    });
}

// render the signIn page
module.exports.signIn = function(req, res) {
    
    return res.render('user_sign_in', {
        title : 'Codeial | SignIn'
    });
}

// render the signUp page
module.exports.signUp = function(req, res) {
    
    return res.render('user_sign_up', {
        title : 'Codeial | SignUp'
    });
}

// get the signUp data
module.exports.create = function(req, res) {
    
    if(req.body.password != req.body.confirm_password) {
        console.log("Passwords Don't Match!");
        res.redirect('back');
        return;
    }

    User.findOne({email : req.body.email}, function(err, user) {

        if(err) {
            console.log('Error in finding the user while signing up.');
            return;
        }

        if(!user) {
            User.create(req.body, function(err, user) {

                if(err) {
                    console.log('Error in Creating the user while singing up.');
                    return;
                }

                console.log(user);
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}