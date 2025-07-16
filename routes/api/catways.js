const express = require('express');
const router = express.Router();

const service = require('../../services/catways');

router.get('/', service.getAllCatways);
router.get('/:id', service.getCatwayById);
router.post('/', service.createCatway);
router.put('/:id', service.updateCatway);
router.delete('/:id', service.deleteCatway);

module.exports = router;