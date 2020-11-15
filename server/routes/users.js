const express = require('express');
const router = new express.Router();
const usersController = require('../controllers/users');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(usersController);

router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);

module.exports = router;
