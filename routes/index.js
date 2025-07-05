const express = require('express');
const router = express.Router();

const userRoute = require('../routes/users');

//
router.get('/', async (req, res) => {
    res.status(200).json({
        name: process.env.APP_NAME ,
        version: '1.0.0',
        status: 200,
        message: 'Bienvenue sur l\'API Russell !'
    });
});

router.use('/user', userRoute); // Route pour les utilisateurs

module.exports = router;
