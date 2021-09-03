const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    position: { type: Number, required: true }
  }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
