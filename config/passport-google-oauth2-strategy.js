const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: '754866611754-hergoq3humbnuu9avdoqf0icqqssn30k.apps.googleusercontent.com',
    clientSecret: 'W3C5i2pmXqowPpg2JGwUvQ4P',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
// accessToken is like in jwt, jwt was out access Token same way google gives us access token.
// refreshToken if we have signed out as session expires the refresh token is used to signin user without telling the user
// done is simply a callback function
// profile would contain user information
function(accessToken, refreshToken, profile, done) {
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
        if(err) {
            console.log('Error in google-passport-strategy: ', err);
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        // if found set user as req.user (means login user)
        if(user) {
            return done(null, user);
        } else {
            // If not found create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                passpord: crypto.randomBytes(20).toString('hex')
            }, function(err, user) {
                if(err) {
                    console.log('Error in creating user in google-passport-strategy: ', err);
                    return;
                }

                return done(null, user);
            });
        }
    });
}));

module.exports = passport;