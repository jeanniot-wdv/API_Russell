const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // Pour le hachage des mots de passe

// Définition du schéma pour les utilisateurs
const User = new Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide'],
        unique: true, //
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
User.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10); // Hachage du mot de passe avec un coût de 10
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('User', User); // Exportation du modèle User