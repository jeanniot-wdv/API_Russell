var express = require('express');
var router = express.Router();

const service = require('../services/users');

// La route pour obtenir les informations d'un utilisateur par son ID
router.get('/:id', service.getUserById);
// La route pour créer un nouvel utilisateur
router.post('/', service.createUser);
// La route pour mettre à jour un utilisateur existant
router.put('/:id', service.updateUser);
// La route pour supprimer un utilisateur par son ID
router.delete('/:id', service.deleteUser);

module.exports = router;
