const Form = require('../models/Form');
const FormItem = require('../models/FormItem');
const ItemChoice = require('../models/ItemChoice');
const ItemResponse = require('../models/ItemResponse');

module.exports = {
  async view(req, res) {
    const { id } = req.params
    const form = await Form.findById(id)

    return res.json(form)
  },

  async list(req, res) {
    const forms = await Form.find()

    return res.json(forms)
  },

  async create(req, res) {
    const { title, start, end } = req.body;

    if (!title) {
      return res.status(400).send({ error: 'Informe o título para continuar.' });
    }

    if (!start) {
      return res.status(400).send({ error: 'Informe a data de início para continuar.' });
    }

    if (!end) {
      return res.status(400).send({ error: 'Informe a data de término para continuar.' });
    }

    startFormatted = start.split('/').reverse().join('-')
    endFormatted = end.split('/').reverse().join('-')

    const form = await Form.create({
      title,
      start: startFormatted,
      end: endFormatted
    })
    return res.json(form);
  },

  async update(req, res) {
    const { id } = req.params;
    const result = await Form.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({ result });
  },

  async delete(req, res) {
    const { id } = req.params;

    await FormItem.deleteMany({ form_id: id });

    await Form.findByIdAndDelete({ _id: id });

    return res.json({ message: 'Deletado' });
  },
}