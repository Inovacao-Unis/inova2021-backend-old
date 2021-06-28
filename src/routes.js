const express = require('express');

const routes = express.Router();

const auth = require('./middlewares/auth');

const UserController = require('./controllers/UserController');

routes.get('/users', auth, UserController.view);
routes.post('/users', auth, UserController.create);






module.exports = routes;