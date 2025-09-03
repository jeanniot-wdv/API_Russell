const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { router } = require('../app');

const KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
    }

    try {
        const decoded = jwt.verify(token, KEY);
        const user = await User.findById(decoded.id).select('-password'); // Exclure le mot de passe
        if (!user) throw new Error('Utilisateur non trouvé');
        req.user = user; // Ajoute l'utilisateur à la requête
        next();
    } catch (error) {
        res.clearCookie('token'); // Supprimer le cookie si le token est invalide
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
}