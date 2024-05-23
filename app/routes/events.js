const express = require('express');
const bookController = require('../controllers/events');

const router = express.Router();

router.get('/', bookController.getEvents);

router.get('/search', bookController.getSearchEvents);

router.get('/create', bookController.getAddEvent);

router.post('/create', bookController.postAddEvent);

router.get('/edit/:id', bookController.getEditEvent);

router.post('/edit/:id', bookController.postEditEvent);

router.post('/delete/:id', bookController.postDeleteEvent);

router.post('/add-interested/:id', bookController.postAddInterest);

router.post('/remove-interested/:id', bookController.postRemoveInterest);



module.exports = router;

