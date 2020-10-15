const express = require('express');
const cityController = require('../controllers/city-controller');

class CityRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'POST', route: '/create',      function: cityController.store},
            {method: 'GET',  route: '/',            function: cityController.list},
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