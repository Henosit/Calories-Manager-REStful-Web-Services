// Chen Moasis 318912805
// Gali Seregin 322060187

// Importing mongoose library
const mongoose = require('mongoose');

// Defining the schema for calorie consumption
const calorieSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900, // Assuming a minimum year
        max: 2100 // Assuming a maximum year
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    day: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'other'], // Define categories
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
});

// Exporting the model based on the schema
module.exports = mongoose.model('Calorie', calorieSchema);