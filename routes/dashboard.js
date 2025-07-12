const express = require('express');
const router = express.Router();

const service = require('../services/dashboard');

router.use('/', service.getDashboardData);

module.exports = router;