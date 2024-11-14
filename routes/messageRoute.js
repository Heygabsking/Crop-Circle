// routes/messageRoute.js
const express = require('express');
const Message = require('../models/message');

const router = express.Router();

// Route to handle form submission and save data to MongoDB
router.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: 'There was an issue saving your message. Please try again later.' });
    }
});

module.exports = router;
