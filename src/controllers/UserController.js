const mongoose = require('mongoose');
const Team = require('../models/Team');

module.exports = {
    async view(req, res) {
      const teams = await Team.find()  
      console.log('req: ', req)
      return res.json({ teams });
    },
  }