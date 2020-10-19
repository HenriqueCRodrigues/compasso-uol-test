const express = require('express');
const cityController = require('../controllers/city-controller');

class CityRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'post', route: '/create',      function: cityController.store},
            {method: 'get',  route: '/',            function: cityController.list},
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new CityRoute().router;

/*

Cadastrar cidade
Cadastrar cliente
Consultar cidade pelo nome
Consultar cidade pelo estado
Consultar cliente pelo nome
Consultar cliente pelo Id
Remover cliente
Alterar o nome do cliente

*/
