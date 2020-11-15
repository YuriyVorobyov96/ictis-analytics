const express = require('express');
const router = new express.Router();
const ordersController = require('../controllers/orders');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(ordersController);
const jwtCheck = require('../middleware/jwtcheck');

router.get('/', jwtCheck.ensureToken, ctrl.list);
router.post('/', jwtCheck.ensureToken, ctrl.addOrder);

module.exports = router;
