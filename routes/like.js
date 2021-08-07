const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like_Controller');

router.post('/toggle', likeController.toggleLike);

module.exports = router;