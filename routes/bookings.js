const express = require('express');
const router = express.Router({ mergeParams: true });
const service = require('../services/bookings');

router.get('/', service.getAllBookings); // Récupérer toutes les réservations d'un catway
router.get('/:id', service.getBookingById); // Récupérer une réservation par son ID
router.post('/', service.createBooking); // Créer une nouvelle réservation
router.put('/:id', service.updateBooking); // Mettre à jour une réservation existante
router.delete('/:id', service.deleteBooking); // Supprimer une réservation par son ID

module.exports = router;