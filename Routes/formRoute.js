const express = require('express');
const router = express.Router();
const { submitForm } = require('../Controller/formController');

// Route to handle form submission
router.post('/submit', submitForm);

module.exports = router;
