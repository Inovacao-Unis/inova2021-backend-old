const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Team', TeamSchema);