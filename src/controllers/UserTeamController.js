const mongoose = require('mongoose');
const UserTeam = require("../models/UserTeam");
const Team = require("../models/Team");
const admin = require("firebase-admin");

module.exports = {
  async view(req, res) {
    const { id } = req.params;

    const userTeam = await UserTeam.findById(id);

    return res.json({ userTeam });
  },

  async viewTeam(req, res) {
    const { authId } = req;

    const team = await UserTeam.findOne({ uid: authId });

    return res.json({ team });
  },

  async list(req, res) {
    const userTeams = await UserTeam.find();

    return res.json(userTeams);
  },

  async create(req, res) {
    const { authId } = req;
    const { team_id } = req.body;

    const team = await Team.findById(team_id);

    if (!team) {
      return res.status(400).send({ error: "Time não cadastrado." });
    }

    const userTeam = await UserTeam.findOne({ uid: authId });

    if (userTeam) {
      return res.status(400).send({ error: "Usuário já está em um time." });
    }

    const result = await UserTeam.create({
      uid: authId,
      team_id,
    });

    res.json(result);
  },

  async update(req, res) {
    const { id } = req.params;
    const result = await UserTeam.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({ result });
  },

  async delete(req, res) {
    const { id } = req.params;

    await UserTeam.findByIdAndDelete({ _id: id });
    return res.json({ message: "Deletado" });
  },
};
