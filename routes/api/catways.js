const express = require('express');
const router = express.Router();
const service = require('../../services/catways');

router.get('/', service.getAllCatways); // Récupérer tous les catways
router.get('/:id', service.getCatwayById); // Récupérer un catway par son ID
router.post('/', service.createCatway); // Créer un nouveau catway
router.put('/:id', service.updateCatway); // Mettre à jour un catway existant
router.delete('/:id', service.deleteCatway); // Supprimer un catway par son ID

module.exports = router;