const express = require('express');

const routes = express.Router();

const auth = require('./middlewares/auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const TeamController = require('./controllers/TeamController');

routes.get('/check', auth, AuthController.check);

routes.get('/user', auth, UserController.view);
routes.post('/users', auth, UserController.create);

routes.get('/teams', auth, TeamController.view);
routes.post('/teams', auth, TeamController.create);






module.exports = routes;