const User = require('../models/user');

// profile page
module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title : 'User',
            profile_user : user
        });
    });
}

// Update the current loggedin user info
module.exports.update = function(req, res) {
    if(req.user.id == req.params.id) {
        
        // One way to do it
        // User.findByIdAndUpdate(req.user.id, {name:body.name, email: body.email}, function() {});
    
        // Second way
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

// render the signIn page
module.exports.signIn = function(req, res) {
    
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title : 'Codeial | SignIn'
    });
}

// render the signUp page
module.exports.signUp = function(req, res) {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
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

// Destro the existing session
module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/');
}