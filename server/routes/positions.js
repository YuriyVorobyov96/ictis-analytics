const express = require('express');
const router = new express.Router();
const positionsController = require('../controllers/positions');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(positionsController);
const jwtCheck = require('../middleware/jwtcheck');

router.get('/:categoryId', jwtCheck.ensureToken, ctrl.readPositions);
router.post('/', jwtCheck.ensureToken, ctrl.addPosition);
router.delete('/:id', jwtCheck.ensureToken, ctrl.removePosition);
router.put('/:id', jwtCheck.ensureToken, ctrl.updatePosition);

module.exports = router;
