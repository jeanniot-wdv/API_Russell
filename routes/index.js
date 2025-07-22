const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userRoute = require('../routes/users'); // Route pour les utilisateurs
const catwayRoute = require('../routes/catways'); // Route pour les catways
const bookingRoute = require('../routes/bookings'); // Route pour les réservations
const userApiRoute = require('../routes/api/users'); // Route pour les utilisateurs
const catwayApiRoute = require('../routes/api/catways'); // Route pour les catways
const bookingApiRoute = require('../routes/api/bookings'); // Route pour les réservations

const authOptional = require('../middleware/authOptional');
// liste des pages
router.get('/', authOptional, (req, res) => {res.render('home', { user: req.user || null })}); // Page d'accueil
router.get('/register', authOptional, (req, res) => {res.render('register', { user: req.user || null })}); // Page d'inscription
router.get('/dashboard', auth, (req, res) => {res.render('dashboard', { user: req.user })}); // Page du tableau de bord
router.get('/doc', auth, (req, res) => {res.render('api-doc', { user: req.user || null })}); // Page de documentation

router.use('/users', auth, userRoute); // Route pour les utilisateurs
router.use('/catways', auth, catwayRoute); // Route pour les catways
router.use('/catways/:catwayId/bookings', auth, bookingRoute); // Route pour les réservations

router.get('/logout', (req, res) => { // Route de déconnexion
    res.clearCookie('token'); // Supprimer le cookie de session
    res.redirect('/'); // Rediriger vers la page d'accueil
});
// liste des routes api
router.use('/api/users', auth, userApiRoute); // Route pour les utilisateurs
router.use('/api/catways', auth, catwayApiRoute); // Route pour les catways
router.use('/api/catways/:catwayId/bookings', auth, bookingApiRoute); // Route pour les réservations

module.exports = router;
