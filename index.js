const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const formRoutes = require('./Routes/formRoute');
const authAdmin = require('./Routes/authAdmin');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Use form routes
app.use('/api', formRoutes);
app.use('/admin', authAdmin);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
