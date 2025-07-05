const mongoose = require('mongoose');
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
    } catch (error) {
        console.error('Erreur de connexion à la base de données MongoDB:', error);
        throw error;
    }
};