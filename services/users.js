// On importe les dépendances nécessaires
const User = require('../models/user'); // Modèle User pour interagir avec la base de données
const bcrypt = require('bcrypt'); // Pour le hachage des mots de passe

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
}
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }
        // Hachage du mot de passe avant de sauvegarder l'utilisateur
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword; // On remplace le mot de passe en clair par le mot de passe haché
        await newUser.save(); // Sauvegarde de l'utilisateur dans la base de données
        //res.status(201).json(newUser); // Réponse avec le nouvel utilisateur créé
        res.redirect('/'); // Redirection vers la page d'accueil après la création de l'utilisateur
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
}
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
}