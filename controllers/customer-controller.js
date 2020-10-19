const CustomerRepository = require('../repositories/customer-repository');

class CustomerController {

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    store = async (req, res, next) => {
        let data = await this.customerRepository.store(req.body);
        res.status(data.status).send(data);
    }

    list = async (req, res, next) => {
        let data = await this.customerRepository.list(req.query);
        res.status(data.status).send(data);
    }

    delete = async (req, res, next) => {
        let data = await this.customerRepository.delete(req.params.id);
        res.status(data.status).send(data);
    }
}

module.exports = new CustomerController();