const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

// const homeController = require('./controllers/home_controller');

// app.get('/', homeController.home);
// app.get('/profile', homeController.profile);


router.get('/', homeController.home);

module.exports = router;