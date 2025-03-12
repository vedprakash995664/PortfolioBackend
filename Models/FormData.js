const mongoose = require('mongoose');

// Define the schema for storing the form data
const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
