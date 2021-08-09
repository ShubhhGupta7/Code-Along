const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ResetPasswordToken = require('../models/resetPasswordToken');

const resetMailer  = require('../mailers/reset_password_mailer');

const queue = require('../config/kue');
const resetEmailWorker = require('../workers/reset_password_email_worker.js');

// Here there is no need of async await as no function uses nested call backs hence no callback hell present.

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
module.exports.update = async function(req, res) {
    // if(req.user.id == req.body.user) {
        
    //     // One way to do it
    //     // User.findByIdAndUpdate(req.user.id, {name:body.name, email: body.email}, function() {});
    
    //     // Second way
    //     User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {

    //         req.flash('success', 'User info updated!');
    //         return res.redirect('back');
    //     });
    // } else {
    //     req.flash('error' ,'Not an Anuthorized User');
    //     return res.status(401).send('Unauthorized');
    // }

    // Using async await syntax
    if(req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            // When we are using multipart data then normal parsing can not be used to get data(req.body)
            // So in this case we use multer to get form data.

            User.uploadedAvatar(req, res, function(err) {
                if(err) {
                    console.log('*******multer Error: ', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;
                user.college = req.body.college;
                user.codechef = req.body.codechef;
                user.codeforces = req.body.codeforces;
                
                if(req.file) {
                    // this is saving the path of the uploaded file into the avatar field in the user.
                    if(user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });
        } catch(error) {
            console.log('in catch avatar function');
            req.flash('Error: ', error);
            return res.redirect('back');
        }


    } else {
        req.flash('error', 'unauthenticated');
        return res.status(401).send('unauthenticated');
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
        req.flash('error' ,"Password does'nt match!");
        return res.redirect('back');
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
                req.flash('success', 'Signed Up successfully!');
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully.');
    return res.redirect('/');
}

// Destro the existing session
module.exports.destroySession = function(req, res) {
    req.logout();
    req.flash('success', 'You have logout!');

    return res.redirect('/');
}

// redirect to reset password page
module.exports.resetPasswordForm = async function(req, res) {
    let user = await User.findOne({email: req.body.email});
    
    if(user) {
        let token = await ResetPasswordToken.create({
            user: user._id,
            accessToken:  crypto.randomBytes(20).toString('hex'),
            isValid: 'true'
        });

        token = await token.populate('user').execPopulate();
        console.log(token);

        let job = queue.create('emails', token).save(function(err) {
            if(err) {
                console.log('Error in sending to the queue: ', err);   
                return;
            }

            console.log('Jon enquened',job.id);
            return;
        });
        req.flash('success', 'Password reset mail has beem deliverd!')

        return res.redirect('back');
    }
    
    else {
        req.flash('error', 'No user present with this email!')
        return res.redirect('back');
    }
}

module.exports.changePasswordRedirect = async function(req, res) {
    console.log('Token in params of redirect link' ,req.params.accessToken);

    return res.render('change_password', {
        title: 'Codeial | Reset Password',
        accessToken: req.params.accessToken
    });
}

// check the password and change the password
module.exports.changePassword = async function(req, res) {
  
    
    if(req.body.password == req.body.confirm_password) {
        let receivedaccessToken = req.body.accessToken;
        console.log('body of change password access token', receivedaccessToken);

        let token = await ResetPasswordToken.findOne({
            accessToken: receivedaccessToken
        });

        console.log('Token getted from the accessToken' ,token);

        if(!token.isValid) {
            req.flash('error', 'OOps!, access token expired');
            return res.render('user_sign_in' ,{
                title: 'Codeial | Sign-In'
            });
        }

        let user = await User.findByIdAndUpdate(token.user, {
            password: req.body.password
        });
        console.log('user for the reset token', user);

        token.isValid = false;
        token.save();

        req.flash('success', 'Password updated successfully!');
        return res.render('user_sign_in' ,{
            title: 'Codeial | Sign-In'
        })
    }

    req.flash('error', "Passwors does'nt Match!");
    return res.redirect('back');
}

// create a token to change password
module.exports.resetPassword = async function(req, res) {
    return res.render('reset_password', {
        title: 'Reset password'
    });
    
}