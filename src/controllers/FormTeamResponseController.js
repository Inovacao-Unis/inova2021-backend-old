const { findById } = require("../models/Form");
const Form = require("../models/Form");
const FormItem = require("../models/FormItem");
const ItemChoice = require("../models/ItemChoice");
const FormResponse = require("../models/FormResponse");
const User = require("../models/User");

module.exports = {
  async view(req, res) {
    const { form_id } = req.params;
    const user = await User.findOne({ uid: req.authId });

    if (!user || !user.team_id) {
      return res.status(400).send({ error: "Houve um erro com o time." });
    }

    const team_id = user.team_id;

    const response = await FormResponse.findOne({
      $and: [{ form_id }, { team_id }],
    });

    return res.json(response);
  },

  async list(req, res) {
    const user = await User.findOne({ uid: req.authId });

    if (!user || !user.team_id) {
      return res.status(400).send({ error: "Houve um erro com o time." });
    }

    const team_id = user.team_id;

    const responses = await FormResponse.find({ team_id });

    return res.json(responses);
  },
};
