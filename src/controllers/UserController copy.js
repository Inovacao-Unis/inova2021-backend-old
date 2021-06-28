const mongoose = require('mongoose');
const User = require('../models/User');
const Team = require('../models/Team');
const admin = require("firebase-admin");

module.exports = {
  async view(req, res) {
    const teams = await Team.find()
    return res.json({ teams });
  },

  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).send({ error: 'Informe nome e email para continuar.' });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).send({ error: 'Usuário já existe' });
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
      .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });

    // await connection('users').insert({
    //   id,
    //   first_name,
    //   last_name,
    //   email,
    //   password: hashedPassword,
    //   isEmailConfirmed
    // })

    return res.json({ id });
  },
}