const express = require('express');
const stateController = require('../controllers/state-controller');

class StateRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'POST', route: '/create',      function: stateController.store},
            {method: 'GET',  route: '/',            function: stateController.list},
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new StateRoute().router;
