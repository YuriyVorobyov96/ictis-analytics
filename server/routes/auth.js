const express = require('express');
const router = new express.Router();

const authController = require('../controllers/auth');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(authController);

router.post('/login', ctrl.login);
router.post('/signup', ctrl.register);

module.exports = router;
