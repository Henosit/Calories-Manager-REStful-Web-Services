const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        // Database error
        res.status(500).json({message: err.message});
    }
});

// Getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

// Creating one subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        // 201 for successful creation
        res.status(201).json(newSubscriber);
    } catch (err) {
        // 400 for bad request
        res.status(400).json({message: err.message});
    }
});

// Updating one subscriber
router.patch('/:id', getSubscriber,async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Deleting one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({message: 'Deleted subscriber'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// MiddleWare
async function getSubscriber(req, res, next) {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.subscriber = subscriber; // Set the subscriber to the response object
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports = router;