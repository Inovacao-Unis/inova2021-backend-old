const express = require('express');

const routes = express.Router();

const auth = require('./middlewares/auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const TeamController = require('./controllers/TeamController');
const FormController = require('./controllers/FormController');
const FormItemController = require('./controllers/FormItemController');
const ItemChoiceController = require('./controllers/ItemChoiceController');
const FormResponseController = require('./controllers/FormResponseController');

routes.get('/check', auth, AuthController.check);

routes.get('/user', auth, UserController.view);
routes.get('/users', auth, UserController.list);
routes.post('/users', auth, UserController.create);
routes.put('/user/:id', auth, UserController.update);
routes.delete('/user/:id', auth, UserController.delete);

routes.get('/team/:id', auth, TeamController.view);
routes.get('/teams', auth, TeamController.list);
routes.post('/teams', auth, TeamController.create);
routes.put('/team/:id', auth, TeamController.update);
routes.delete('/team/:id', auth, TeamController.delete);

routes.get('/form/:id', auth, FormController.view);
routes.get('/forms', auth, FormController.list);
routes.post('/forms', auth, FormController.create);
routes.put('/form/:id', auth, FormController.update);
routes.delete('/form/:id', auth, FormController.delete);

routes.get('/form-item/:id', auth, FormItemController.view);
routes.get('/form-items', auth, FormItemController.list);
routes.post('/form-items', auth, FormItemController.create);
routes.put('/form-item/:id', auth, FormItemController.update);
routes.delete('/form-item/:id', auth, FormItemController.delete);

routes.get('/item-choice/:id', auth, ItemChoiceController.view);
routes.get('/item-choices', auth, ItemChoiceController.list);
routes.post('/item-choices', auth, ItemChoiceController.create);
routes.put('/item-choice/:id', auth, ItemChoiceController.update);
routes.delete('/item-choice/:id', auth, ItemChoiceController.delete);

routes.get('/form-response/:id', auth, FormResponseController.view);
routes.get('/form-responses', auth, FormResponseController.list);
routes.post('/form-responses', auth, FormResponseController.create);
routes.put('/form-response/:id', auth, FormResponseController.update);
routes.delete('/form-response/:id', auth, FormResponseController.delete);







module.exports = routes;