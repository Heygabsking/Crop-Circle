// models/message.js
const mongoose = require('mongoose');

// Define schema for the contact form submission
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
