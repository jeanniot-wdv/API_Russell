const express = require('express');
const router = express.Router();

const service = require('../services/catways');

// La route pour obtenir les informations d'un catway par son ID
router.get('/:id', service.getCatwayById);
// La route pour créer un nouveau catway
router.post('/', service.createCatway);
// La route pour mettre à jour un catway existant
router.put('/:id', service.updateCatway);
// La route pour supprimer un catway par son ID
router.delete('/:id', service.deleteCatway);

module.exports = router;