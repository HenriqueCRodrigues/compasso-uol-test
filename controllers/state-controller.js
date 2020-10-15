const StateRepository = require('../repositories/state-repository');

class StateController {

    constructor() {
        this.stateRepository = new StateRepository();
    }

    store = async (req, res, next) => {
        let data = await this.stateRepository.store(req.body);
        res.status(data.status).send(data);
    }

    list = async (req, res, next) => {
        let data = await this.stateRepository.list(req.body);
        res.status(data.status).send(data);
    }
}

module.exports = new StateController();