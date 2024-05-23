const express = require('express');
const errorController = require('../controllers/errors');

const router = express.Router();

router.get('/401', errorController.get401Page);



// Ustawienie kontrolera błędów dla każdego żądania, które nie pasuje do innych tras
router.use(errorController.getNotFoundPage);

module.exports = router;