const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Récupération de tous les utilisateurs
        res.render('users', { users, user: req.user }); // Rendu de la vue 'users' avec la liste des utilisateurs
        // res.status(200).json(users); // Si on veut renvoyer les utilisateurs
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.render('users-show', { user }); // Rendu de la vue 'users-show' avec les détails de l'utilisateur
        // res.status(200).json(user); // Si on veut renvoyer l'utilisateur
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
});

module.exports = router;
