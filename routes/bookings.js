const express = require('express');
const router = express.Router();

const service = require('../services/bookings');

// La route pour obtenir les informations d'une réservation par son ID
router.get('/:id', service.getBookingById);
// La route pour créer une nouvelle réservation
router.post('/', service.createBooking);
// La route pour mettre à jour une réservation existante
router.put('/:id', service.updateBooking);
// La route pour supprimer une réservation par son ID
router.delete('/:id', service.deleteBooking);

module.exports = router;