const jwt = require('jsonwebtoken');
const User = require('../models/user');

const KEY = process.env.SECRET_KEY;

// Middleware pour authentification optionnelle
module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, KEY);
        const user = await User.findById(decoded.id).select('-password');
        if (user) req.user = user;
    } catch (err) {
        res.clearCookie('token');
    }
    next();
};
