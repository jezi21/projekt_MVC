const express = require('express');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', homeController.getHome);

router.get('/about', homeController.getAbout);

module.exports = router;