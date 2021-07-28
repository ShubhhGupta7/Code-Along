const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
// const passport = require('passport');

console.log('Router loaded');

router.get('/', homeController.home);
// The below route would be used if we want that user should only see home if they are signed in.
// router.get('/', passport.checkAuthentcation, homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./post'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;