const mongoose = require('mongoose');
const Team = require('../models/Team');


module.exports = {
    async view(req, res) {
      
      

      return res.json({ teams });
    },
  }