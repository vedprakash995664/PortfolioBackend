const express = require('express');
const router = express.Router();
const { submitForm } = require('../Controller/formController');
const { getFormData } = require('../Controller/formController');
const { deleteFormData } = require('../Controller/formController');

// Route to handle form submission
router.post('/submit', submitForm);
router.get('/getall', getFormData);
router.delete('/delete/:id', deleteFormData);

module.exports = router;
