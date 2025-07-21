const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userRoute = require('../routes/users'); // Route pour les utilisateurs
const catwayRoute = require('../routes/catways'); // Route pour les catways
const bookingRoute = require('../routes/bookings'); // Route pour les réservations
const authOptional = require('../middleware/authOptional');
// liste des pages
router.get('/', authOptional, (req, res) => {res.render('home', { user: req.user || null })}); // Page d'accueil
router.get('/register', (req, res) => {res.render('register', { user: req.user || null })}); // Page d'inscription
router.get('/dashboard', auth,(req, res) => {res.render('dashboard', { user: req.user })}); // Page du tableau de bord
router.get('/login', (req, res) => {res.render('login')}); // Page de connexion

router.get('/logout', (req, res) => { // Route de déconnexion
    res.clearCookie('token'); // Supprimer le cookie de session
    res.redirect('/'); // Rediriger vers la page d'accueil
});
// liste des routes api
router.use('/users', auth, userRoute); // Route pour les utilisateurs
router.use('/catways', auth, catwayRoute); // Route pour les catways
router.use('/catways/:catwayId/bookings', auth, bookingRoute); // Route pour les réservations

module.exports = router;
