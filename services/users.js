const User = require('../models/user'); // Modèle User pour interagir avec la base de données

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Récupération de tous les utilisateurs
        //res.render('users', { users, user: req.user }); // Rendu de la vue 'users' avec la liste des utilisateurs
        res.status(200).json(users); // Si on veut renvoyer les utilisateurs
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user); // Réponse avec les détails de l'utilisateur
        //res.render('users-show', { user }); // Rendu de la vue 'users-show' avec les détails de l'utilisateur
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
        newUser.firstname = capitalize(newUser.firstname);
        newUser.name = capitalize(newUser.name);
        await newUser.save(); // Sauvegarde de l'utilisateur dans la base de données
        //res.status(201).json(newUser); // Réponse avec le nouvel utilisateur créé
        res.redirect('/users/'); // Redirection vers la page d'accueil après la création de l'utilisateur
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
        res.redirect('/users/'); // Redirection vers la page d'accueil après la suppression de l'utilisateur
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
}