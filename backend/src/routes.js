const express = require('express');

const connection = require('./database/connection');

const routes = express.Router();

const ColetaController = require('./controllers/ColetaController');

routes.get('/coletas', ColetaController.list);

routes.post('/coletas', ColetaController.create);

module.exports = routes;