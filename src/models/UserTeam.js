const mongoose = require("mongoose");

const UserTeamSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: { unique: true },
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserTeam", UserTeamSchema);
