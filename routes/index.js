const express = require('express');
const router = express.Router();

const userRoute = require('../routes/users'); // Route pour les utilisateurs
const catwayRoute = require('../routes/catways'); // Route pour les catways
const bookingRoute = require('../routes/bookings'); // Route pour les réservations
const dashboardRoute = require('../routes/dashboard'); // Route pour le tableau de bord

//
router.get('/', async (req, res) => {
    res.status(200).json({
        name: process.env.APP_NAME ,
        version: '1.0.0',
        status: 200,
        message: 'Bienvenue sur l\'API Russell !'
    });
});

router.use('/user', userRoute); // Route pour les utilisateurs
router.use('/catway', catwayRoute); // Route pour les catways
router.use('/catway/:catwayId/booking', bookingRoute); // Route pour les réservations
router.use('/dashboard', dashboardRoute); // Route pour le tableau de bord


module.exports = router;
