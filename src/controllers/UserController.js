const AllowedEmail = require("../models/AllowedEmail");
const Team = require("../models/Team");
const admin = require("firebase-admin");

module.exports = {
  async view(req, res) {
    const { authId } = req;

    await admin
      .auth()
      .getUser(authId)
      .then((user) => {
        return res.json(user);
      })
      .catch((error) => {
        return res.status(400).send({ error: "Erro ao buscar dados." })
      });
  },

  async list(req, res) {
    await admin
      .auth()
      .listUsers(1000)
      .then((listUsersResult) => {
        return res.json(listUsersResult);
      })
      .catch((error) => {
        return res.status(400).send({ error: "Erro ao buscar dados." })
      });
  },

  async create(req, res) {
    const { displayName, email, password, teamId } = req.body;

    if (!displayName || !email || !teamId) {
      return res
        .status(400)
        .send({ error: "Informe nome, email e time para continuar." });
    }

    const exists = await AllowedEmail.findOne({ email });

    if (!exists) {
      return res
        .status(400)
        .send({ error: "Sem autorização para se cadastrar." });
    }

    const team = await Team.findOne({ _id: teamId });

    if (!team) {
      return res.status(400).send({ error: "Time não cadastrado." });
    }

    if (!password) {
      return res.status(400).send({ error: "Informe a senha para continuar" });
    }

    await admin
      .auth()
      .createUser({
        email,
        emailVerified: false,
        password,
        displayName,
        disabled: false,
      })
      .then(async (userRecord) => {
        return res.json(userRecord);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-exists":
            return res.json({ error: "Usuário já existe." });
            break;
          default:
            console.log("erro ", error);
            return res.json({ error: "Erro ao cadastrar usuário." });
        }
      });
  },

  async update(req, res) {
    const { id } = req.params;
    // const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({ result });
  },

  // async delete(req, res) {
  //   const { id } = req.params;
  //   const user = await User.findById(id);

  //   if (!user) {
  //     return res.status(400).send({ error: "Usuário não existe." });
  //   }

  //   admin
  //     .auth()
  //     .deleteUser(user.uid)
  //     .then(async () => {
  //       await User.findByIdAndDelete({ _id: id });
  //       return res.json({ message: "Deletado" });
  //     })
  //     .catch((error) => {
  //       return res
  //         .status(400)
  //         .send({ error: "Não foi possível deletar o usuário." });
  //     });
  // },
};
