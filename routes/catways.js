const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Catway = require('../models/catway');

// Récupérer tous les catways
router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways, user: req.user || null }); // Afficher la liste des catways
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving catways', error });
    }
});
// Récupérer un catway par son ID avec ses réservations
router.get('/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        const bookings = await Booking.find({ catwayNumber: catway.catwayNumber });
        res.render('catway-show', { catway, bookings, user: req.user || null }); // Afficher les détails du catway avec ses réservations
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving catway', error });
    }
});

module.exports = router;