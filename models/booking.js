const mangoose = require('mongoose');
const catway = require('./catway');
const Schema = mangoose.Schema;

// Définition du schéma pour les réservations
const Booking = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de la passerelle est requis'],
        true: true
    },
    userName: {
        type: String,
        required: [true, 'Le nom de l\'utilisateur est requis'],
        trim: true
    },
    boatName: {
        type: String,
        required: [true, 'Le nom du bateau est requis'],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'La date de début est requise'],
        validate: {
            validator: function(value) {
                return value >= new Date();
            }
        }
    },
    endDate: {
        type: Date,
        required: [true, 'La date de fin est requise'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour vérifier la disponibilité de la passerelle avant de sauvegarder la réservation
Booking.pre('save', async function(next) {
    try {
        const catwayExists = await catway.findOne({ catwayNumber: this.catwayNumber });
        if (!catwayExists) {
            return next(new Error('La passerelle n\'existe pas'));
        }
        
        // Vérifier si la passerelle est déjà réservée pour les dates spécifiées
        const existingBooking = await Booking.findOne({
            catwayNumber: this.catwayNumber,
            $or: [
                { startDate: { $lt: this.endDate, $gt: this.startDate } },
                { endDate: { $gt: this.startDate, $lt: this.endDate } }
            ]
        });

        if (existingBooking) {
            return next(new Error('La passerelle est déjà réservée pour ces dates'));
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mangoose.model('Booking', Booking); // Exportation du modèle Booking