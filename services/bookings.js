
const Booking = require('../models/booking');
const Catway = require('../models/catway');

// Fonction pour obtenir toutes les réservations
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error });
    }
}
// Fonction pour créer une nouvelle réservation
exports.createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de la réservation', error });
    }
}
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la réservation', error });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error });
    }
}

// Fonction pour vérifier la disponibilité d'une passerelle
exports.checkCatwayAvailability = async (req, res) => {
    try {
        const { catwayNumber, startDate, endDate } = req.body;

        // Vérifier si la passerelle existe
        const catwayExists = await Catway.findOne({ catwayNumber });
        if (!catwayExists) {
            return res.status(404).json({ message: 'La passerelle n\'existe pas' });
        }
        // Vérifier si la passerelle est déjà réservée pour les dates spécifiées
        const existingBooking = await Booking.findOne({
            catwayNumber,
            $or: [
                { startDate: { $lt: endDate, $gt: startDate } },
                { endDate: { $gt: startDate, $lt: endDate } }
            ]
        });
        if (existingBooking) {
            return res.status(400).json({ message: 'La passerelle est déjà réservée pour ces dates' });
        }
        res.status(200).json({ message: 'La passerelle est disponible pour les dates spécifiées' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la vérification de la disponibilité de la passerelle', error });
    }
}
// Fonction pour lister toutes les réservations
exports.listBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
    }
} 