// Chen Moasis 318912805
// Gali Seregin 322060187

// Importing required modules
require('dotenv').config();
const express = require('express');
const { body, validationResult, query } = require('express-validator');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

// Connecting to the database
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    });

// Middleware to parse JSON
app.use(express.json());

// Importing Calorie model
const Calorie = require("./models/calorie");

// About route to display developers' information
app.get('/about', (req, res) => {
    // Array of objects describing developers
    const developers = [
        { "firstname": "Chen", "lastname": "Moasis", "id": 318912805, "email": "chenmoasis@gmail.com" },
        { "firstname": "Gali", "lastname": "Seregin", "id": 322060187, "email": "glygly135@gmail.com" }
    ];
    res.json(developers);
});

// Route to add calorie consumption
app.post('/addcalories', [
    // Define validation rules using express-validator
    body('user_id').isNumeric(),
    body('year').isInt({ min: 1900, max: 2100 }),
    body('month').isInt({ min: 1, max: 12 }),
    body('day').isInt({ min: 1, max: 31 }),
    body('description').notEmpty(),
    body('category').notEmpty(),
    body('amount').isInt({ min: 0 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const calorie = new Calorie({
        user_id: req.body.user_id,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        description: req.body.description,
        category: req.body.category,
        amount: req.body.amount
    });

    try {
        const newCalorie = await calorie.save();
        // 201 for successful creation
        res.status(201).json(newCalorie);
    } catch (err) {
        // 400 for bad request
        res.status(400).json({ message: err.message });
    }
});

// Route to generate calorie consumption report
app.get('/report', [
    // Define validation rules using express-validator
    query('user_id').isNumeric(),
    query('year').isInt({ min: 1900, max: 2100 }),
    query('month').isInt({ min: 1, max: 12 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extract parameters from the request query
        const { year, month, user_id } = req.query;

        // Query the database to retrieve calorie consumption items
        const calories = await Calorie.find({ user_id, year, month });

        // Initialize an object to store calorie consumption by category
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        // Group calorie consumption items by category
        calories.forEach(calorie => {
            report[calorie.category].push({
                user_id: calorie.user_id,
                year: calorie.year,
                month: calorie.month,
                day: calorie.day,
                description: calorie.description,
                category: calorie.category,
                amount: calorie.amount
            });
        });

        // Return the detailed report
        res.json(report);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => { console.log(`Server is running at: http://localhost:${PORT}`) });