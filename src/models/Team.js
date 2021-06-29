const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Team', TeamSchema);