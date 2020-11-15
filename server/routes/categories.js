const express = require('express');
const router = new express.Router();
const categoryController = require('../controllers/categories');
const { wrapController } = require('../helpers/catchError');
const ctrl = wrapController(categoryController);
const jwtCheck = require('../middleware/jwtcheck');
const upload = require('../middleware/upload');

router.get('/', jwtCheck.ensureToken, ctrl.list);
router.get('/:id', jwtCheck.ensureToken, ctrl.readCategory);
router.post('/', jwtCheck.ensureToken, upload, ctrl.addCategory);
router.delete('/:id', jwtCheck.ensureToken, ctrl.removeCategory);
router.put('/:id', jwtCheck.ensureToken, upload, ctrl.updateCategory);

module.exports = router;
