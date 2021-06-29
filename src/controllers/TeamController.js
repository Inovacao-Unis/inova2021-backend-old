const User = require('../models/User');
const Team = require('../models/Team');
const normalize = require('../utils/normalize');

module.exports = {
  async view(req, res) {
    const teams = await Team.find()
    return res.json({ teams });
  },

  async create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Informe o nome para continuar.' });
    }

    const username = normalize(name);

    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).send({ error: 'Time já existe' });
    }

    await Team.create({
      name,
      username
    })
    return res.json({ 'message': 'Time criado!' });
  },
}