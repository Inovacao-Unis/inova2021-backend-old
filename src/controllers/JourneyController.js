const Journey = require("../models/Journey");
const normalize = require("../utils/normalize");

module.exports = {
  async view(req, res) {
    const { id } = req.params;
    const journey = await Journey.findById(id);

    return res.json(journey);
  },

  async list(req, res) {
    const journeys = await Journey.find();
    return res.json({ journeys });
  },

  async create(req, res) {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return res.status(400).send({ error: "Informe o nome para continuar." });
    }

    const slug = normalize(title);

    const exists = await Journey.findOne({ slug });

    if (exists) {
      return res.status(400).send({ error: "Jornada já existe" });
    }

    await Journey.create({
      title,
      slug,
      description
    });
    return res.json({ message: "Jornada criada!" });
  },

  async update(req, res) {
    const { id } = req.params;
    const result = await Journey.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({ result });
  },

  async delete(req, res) {
    const { id } = req.params;
    await Journey.findByIdAndDelete({ _id: id });

    return res.json({ message: "Deletado" });
  },
};
