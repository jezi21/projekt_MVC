const express = require('express');
const userController = require('../controllers/users');


const router = express.Router();

router.get('/login', userController.getLoginOrRegister);

router.post('/login', userController.postLogin);

router.post('/register', userController.postRegister);

router.get('/logout', userController.getLogout);

router.get('/profile', userController.getProfile);

router.get('/edit-profile', userController.getEditProfile);

router.post('/edit-profile', userController.postEditProfile);

module.exports = router;