const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const SECRET_KEY = 'votre_clé_secrète';

// Afficher le formulaire d’inscription
router.get('/register', (req, res) => {
    res.render('register');
});

// Route pour l'inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { name, firstname, email, password } = req.body;
    try {
        const newUser = new User({ name, firstname, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour la connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;