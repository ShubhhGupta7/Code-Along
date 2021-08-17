const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const env = require('../config/enviroment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(JwtPayLoad, done) {
    User.findById(JwtPayLoad._id, function(err, user) {
        if(err) {
            console.log('Error in finding the user from JWT');
            return;
        }

        if(user) {
            return done(null, user);
        } else  {
            return done(null, false);
            // Or we can create a new Account.
        }
    });
}));

module.exports = passport;