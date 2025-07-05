const mangoose = require('mongoose');
const Schema = mangoose.Schema;

// Définition du schéma pour les passerelles (catways)
const Catway = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de la passerelle est requis'],
        unique: true, // Assure que le numéro de la passerelle est unique
        trim: true
    },
    catwayType: {
        type: String,
        required: [true, 'Le type de passerelle est requis'],
        enum: ['long', 'short'], // Enum pour les types de passer
        trim: true,
        message: 'Le type de passerelle doit être "long" ou "short"'
    },
    catwayState: {
        type: String,
        trim: true
    }
});

// Middleware pour vérifier l'unicité du numéro de la passerelle avant de sauvegarder
Catway.pre('save', async function(next) {
    try {
        const existingCatway = await mangoose.model('Catway').findOne({ catwayNumber: this.catwayNumber });
        if (existingCatway) {
            return next(new Error('Le numéro de la passerelle doit être unique'));
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mangoose.model('Catway', Catway); // Exportation du modèle Catway