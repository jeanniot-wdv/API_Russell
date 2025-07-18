const jwt = require('jsonwebtoken');
const SECRET_KEY = 'votre_clé_secrète';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé' });
    }

    const bearerToken = token.split(' ')[1];
    try {
        const decoded = jwt.verify(bearerToken, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    }
}