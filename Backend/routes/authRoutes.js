const express = require('express');
const router = express.Router();
const authLogic = require('../logic/authLogic');

router.post('/login', authLogic.login);

module.exports = router;