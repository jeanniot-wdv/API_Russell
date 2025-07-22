const express = require('express');
const router = express.Router();
const service = require('../../services/users');

router.get('/', service.getAllUsers); // La route pour obtenir tous les utilisateurs
router.get('/:id', service.getUserById); // La route pour obtenir les informations d'un utilisateur par son ID
router.post('/', service.createUser); // La route pour créer un nouvel utilisateur
router.put('/:id', service.updateUser); // La route pour mettre à jour un utilisateur existant
router.delete('/:id', service.deleteUser); // La route pour supprimer un utilisateur par son ID

module.exports = router;
