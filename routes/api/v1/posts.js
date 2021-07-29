const express = require('express');
const router = express.Router();

const passport = require('passport');

const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: 'false'}),postsApi.destroy);
// Defaultly passport creates a session-cookie, But as we are using jwt we don't want session key to be generated.
// Hence we will set session as false to disable session cookie.
module.exports = router;