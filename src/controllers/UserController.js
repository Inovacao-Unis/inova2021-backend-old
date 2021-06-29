const User = require('../models/User');
const Team = require('../models/Team');
const admin = require("firebase-admin");

module.exports = {
  async view(req, res) {
    const { authId } = req
    console.log('res: ', res)
    const user = await User.findOne({ uid: authId })
    return res.json({ user });
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
        console.log('Successfully created new user:', userRecord.uid);
        const user = await User.create({
          uid: userRecord.uid,
          name,
          email,
          team_id: teamId
        })
        return res.json({ user: user._id });
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/email-already-exists':
            return res.json({ "error": "Usuário já existe." });
            break
          default:
            console.log("erro ", error)
            return res.json({ "error": "Erro ao cadastrar usuário." });
        }
      });



    
  },
}