const User = require('../models/User');
const Team = require('../models/Team');
const admin = require("firebase-admin");

module.exports = {
  async view(req, res) {
    const { authId } = req
    const user = await User.findOne({ uid: authId })

    return res.json({ user });
  },

  async list(req, res) {
    const users = await User.find()
    return res.json(users)
  },

  async create(req, res) {
    const { name, email, password, teamId } = req.body;

    if (!name || !email || !teamId) {
      return res.status(400).send({ error: 'Informe nome, email e time para continuar.' });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).send({ error: 'Usuário já existe' });
    }

    const team = await Team.findOne({ _id: teamId });

    if (!team) {
      return res.status(400).send({ error: 'Time não cadastrado.' });
    }


    if (!password) {
      return res.status(400).send({ error: 'Informe a senha para continuar' });
    }

    admin
      .auth()
      .createUser({
        email,
        emailVerified: false,
        password,
        displayName: name,
        disabled: false,
      })
      .then(async (userRecord) => {
        const user = await User.create({
          uid: userRecord.uid,
          name,
          email,
          team_id: teamId
        })

        team.users.push(user);
        await team.save();

        return res.json({ user: user._id });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-exists':
            return res.json({ "error": "Usuário já existe." });
            break
          default:
            console.log("erro ", error)
            return res.json({ "error": "Erro ao cadastrar usuário." });
        }
      });
  },

  async update(req, res) {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({ result });
  },

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findById(id)

    if (!user) {
      return res.status(400).send({ error: 'Usuário não existe.' });
    }

    admin
      .auth()
      .deleteUser(user.uid)
      .then(async () => {
        await User.findByIdAndDelete({ _id: id });
        return res.json({ message: 'Deletado' });
      })
      .catch((error) => {
        return res.status(400).send({ error: 'Não foi possível deletar o usuário.' });
      });

  },
}