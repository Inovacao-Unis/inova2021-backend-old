const express = require('express');

const routes = express.Router();

const auth = require('./middlewares/auth');

const UserController = require('./controllers/UserController');

routes.get('/users', auth, UserController.view);






module.exports = routes;