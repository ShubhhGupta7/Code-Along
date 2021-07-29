const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/sign-up', passport.notAuthenticated, userController.signUp);
router.post('/create', userController.create);

router.get('/sign-in', passport.notAuthenticated ,userController.signIn);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.post('/update/:id', userController.update);
router.get('/sign-out', userController.destroySession);

// These routes are used for authentication using google
// this url sends the data to google for authentication 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// On this url we get back data from google if user exist
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), userController.createSession);

// use passport as a middleware to authenticate.
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), userController.createSession);

module.exports = router;