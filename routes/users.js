const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Getting all subscribers
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        // Database error
        res.status(500).json({message: err.message});
    }
});

// Getting one subscriber
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating one subscriber
router.post('/', async (req, res) => {
    const user = new User({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday
    });

    try {
        const newUser = await user.save();
        // 201 for successful creation
        res.status(201).json(newUser);
    } catch (err) {
        // 400 for bad request
        res.status(400).json({message: err.message});
    }
});

// Updating one subscriber
router.patch('/:id', getUser,async (req, res) => {
    if (req.body.first_name != null) {
        res.user.first_name = req.body.first_name;
    }

    if (req.body.last_name != null) {
        res.user.last_name = req.body.last_name;
    }

    if (req.body.birthday != null) {
        res.user.birthday = req.body.birthday;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Deleting one subscriber
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message: 'Deleted user'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// MiddleWare
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.user = user; // Set the user to the response object
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports = router;