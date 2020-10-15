const express = require('express');
const customerController = require('../controllers/customer-controller');

class CustomerRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'post', route: '/create',      function: customerController.store},
            {method: 'get',  route: '/',            function: customerController.list},
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new CustomerRoute().router;
