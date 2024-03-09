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
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
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
        required: true
    },
});

// Exporting the model based on the schema
module.exports = mongoose.model('Calorie', calorieSchema);