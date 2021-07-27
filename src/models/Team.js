const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Team', TeamSchema);