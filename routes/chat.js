const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat_controller');

router.get('/chats', chatController.chatBox);

module.exports = router;