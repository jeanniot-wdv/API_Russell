//const app = require('./app'); // Importation de l'application Express
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000; // Port d'écoute du serveur, par défaut 3000

// Configuration de la connexion à la base de données MongoDB
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'API_Russell'
};
// Fonction pour initialiser la connexion à la base de données MongoDB
exports.initClientDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    console.log('Connexion à la base de données MongoDB réussie');
    console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
    } catch (error) {
        console.error('Erreur de connexion à la base de données MongoDB:', error);
        throw error;
    }
};