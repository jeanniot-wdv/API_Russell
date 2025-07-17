const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors= require('cors');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');
const { version } = require('os');

mongodb.initClientDbConnection(); // Initialisation de la connexion à la base de données MongoDB

const app = express(); // Création de l'application Express

app.use(cors({
  origin: '*', // Autoriser toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser les méthodes HTTP
  exposedHeaders: ['Authorization'] // Exposer l'en-tête Authorization
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware pour parser les données du corps de la requête
app.use(cookieParser());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.set('view engine', 'ejs'); // Moteur de rendu des vues EJS
app.set('views', path.join(__dirname, 'views')); // Dossier des vues

app.use('/', indexRouter); // Route principale de l'application
app.use(express.static(path.join(__dirname, 'public'))); // Dossier public pour les fichiers statiques

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({name: 'Erreur API', version: '1.0.0', status: 404, message: 'La ressource demandée n\'existe pas.'});
});

module.exports = app;
