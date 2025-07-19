
const Booking = require('../models/booking');
const Catway = require('../models/catway');

// Fonction pour récupérer toutes les réservations d'un catway
exports.getAllBookings = async (req, res) => {
    try {
        const catwayNumber = req.params.catwayId; // Récupérer l'ID du catway depuis les paramètres de la route
        const bookings = await Booking.find({ catway: catwayNumber }).populate('catway'); // Récupérer les réservations associées à ce catway
        if (!bookings) {
            return res.status(404).json({ message: 'No bookings found for this catway' });
        }
        res.render('catway-show', { bookings, catwayNumber }); // Rendre la vue avec les réservations et le numéro du catway
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};
// Fonction pour récupérer une réservation par son ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id); // Récupérer la réservation par son ID et peupler le champ catway
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.render('bookings', { booking, user: req.user }); // Rendre la vue avec la réservation et le catway
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error });
    }
}
// Fonction pour créer une nouvelle réservation
exports.createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.redirect(`/catways/${req.params.catwayId}/bookings/${newBooking._id}`); // Redirection vers la page de la réservation créée
    } catch (error) {
        res.status(400).json({ message: 'Error creating booking', error });
    }
}
// Fonction pour mettre à jour une réservation existante
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.redirect(`/catways/${req.params.catwayId}/bookings/${updatedBooking._id}`); // Redirection vers la page de la réservation mise à jour
    } catch (error) {
        res.status(400).json({ message: 'Error updating booking', error });
    }
}
// Fonction pour supprimer une réservation par son ID
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.redirect(`/catways/${req.params.catwayId}`); // Redirection vers la liste des réservations du catway
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
}