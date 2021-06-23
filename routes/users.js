const express = require('express');

const router = express.Router();
const userController = require('../controllers/user_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile', userController.profile);
router.get('/post', postController.post);

module.exports = router;