const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = 'votre_clé_secrète';

// Middleware pour authentification optionnelle
module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');
        if (user) req.user = user;
    } catch (err) {
        res.clearCookie('token');
    }
    next();
};
