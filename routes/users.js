const express = require('express');

const router = express.Router();
const userController = require('../controllers/user_controller');
const postController = require('../controllers/posts_controller');

router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.get('/sign-in', userController.signIn);
router.post('create-session', userController.createSession);
router.get('/profile', userController.profile);
router.get('/post', postController.post);

module.exports = router;