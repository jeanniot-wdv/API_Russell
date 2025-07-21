const Booking = require('../models/booking');
const Catway = require('../models/catway');

// Fonction pour récupérer tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways, user: req.user || null }); // Afficher la liste des catways
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving catways', error });
    }
}
// Fonction pour récupérer un catway par son ID avec ses réservations
exports.getCatwayById = async (req, res) => {
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
}
// Fonction pour créer un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        //res.status(201).json(newCatway);
        res.redirect(`/catways/${newCatway._id}`); // Redirection vers la page du nouveau catway
    } catch (error) {
        res.status(400).json({ message: 'Error creating catway', error });
    }
}
// Fonction pour mettre à jour un catway existant
exports.updateCatway = async (req, res) => {
    try {
        const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé !' });
        }
        res.redirect(`/catways/${updatedCatway._id}`); // Redirection vers la page du catway mis à jour
    } catch (error) {
        res.status(400).json({ message: 'Error updating catway', error });
    }
}
// Fonction pour supprimer un catway par son ID
exports.deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
        if (!deletedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé !' });
        }
        res.redirect('/catways/'); // Redirection vers la liste des catways après suppression
    } catch (error) {
        res.status(500).json({ message: 'Impossible de supprimer le catway !', error });
    }
}