const express = require('express');
const router = express.Router({ mergeParams: true });
const Booking = require('../models/booking');
const Catway = require('../models/catway');

// Fonction pour récupérer toutes les réservations d'un catway
router.get('/', async (req, res) => {
    try {
        const catwayNumber = req.params.catwayId; // Récupérer l'ID du catway depuis les paramètres de la route
        const bookings = await Booking.find({ catway: catwayNumber }).populate('catway'); // Récupérer les réservations associées à ce catway
        if (!bookings) {
            return res.status(404).json({ message: 'No bookings found for this catway' });
        }
        res.render('catways-show', { bookings, user: req.user }); // Rendre la vue avec les réservations et le catway
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
});
// Fonction pour récupérer une réservation par son ID
router.get('/:id', async (req, res) => {
    try {
        const catwayId = req.params.catwayId; // Récupérer l'ID du catway depuis les paramètres de la route
        const catway = await Catway.findById(catwayId); // Récupérer le catway par son ID
        const booking = await Booking.findById(req.params.id); // Récupérer la réservation par son ID et peupler le champ catway
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.render('bookings', { booking, catway, user: req.user }); // Rendre la vue avec les détails de la réservation
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error });
    }
});

module.exports = router;