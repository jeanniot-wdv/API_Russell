const express = require('express');
const router = express.Router();

const userRoute = require('../routes/users'); // Route pour les utilisateurs
const catwayRoute = require('../routes/catways'); // Route pour les catways
const bookingRoute = require('../routes/bookings'); // Route pour les réservations
// liste des pages
router.get('/', (req, res) => {res.render('home')}); // Page d'accueil
router.get('/register', (req, res) => {res.render('register')}); // Page d'inscription
router.get('/login', (req, res) => {res.render('login')}); // Page de connexion
router.get('/dashboard', (req, res) => {res.render('dashboard')}); // Page du tableau de bord
// liste des routes api
router.use('/users', userRoute); // Route pour les utilisateurs
router.use('/catways', catwayRoute); // Route pour les catways
router.use('/catways/:catwayId/bookings', bookingRoute); // Route pour les réservations

module.exports = router;
