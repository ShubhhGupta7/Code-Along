const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/sign-up', passport.notAuthenticated, userController.signUp);
router.post('/create', userController.create);
router.get('/sign-in', passport.notAuthenticated ,userController.signIn);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/sign-out', userController.destroySession);
router.post('/update/:id', userController.update);
// use passport as a middleware to authenticate.
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), userController.createSession);

module.exports = router;