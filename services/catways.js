
const Catway = require('../models/catway');

// Fonction pour obtenir tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving catways', error });
    }
}

// Fonction pour obtenir les informations d'un catway par son ID
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving catway', error });
    }
}

// Fonction pour créer un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.status(201).json(newCatway);
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
        res.status(200).json(updatedCatway);
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
        res.status(200).json({ message: 'Catway supprimé avec succès !' });
    } catch (error) {
        res.status(500).json({ message: 'Impossible de supprimer le catway !', error });
    }
}
// Fonction pour vérifier la disponibilité d'un catway