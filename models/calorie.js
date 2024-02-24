// Chen Moasis 318912805
// Gali Seregin 322060187

const mongoose = require('mongoose');

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

module.exports = mongoose.model('Calorie', calorieSchema);
