const mongoose = require('mongoose');
const catway = require('./catway');
const Schema = mongoose.Schema;

// Définition du schéma pour les réservations
const Booking = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de la passerelle est requis'],
        true: true
    },
    clientName: {
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

module.exports = mongoose.model('Booking', Booking); // Exportation du modèle Booking