const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Challenge', ChallengeSchema);