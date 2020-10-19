const CityRepository = require('../repositories/city-repository');

class CityController {

    constructor() {
        this.cityRepository = new CityRepository();
    }

    store = async (req, res, next) => {
        let data = await this.cityRepository.store(req.body);
        res.status(data.status).send(data);
    }

    list = async (req, res, next) => {
        let data = await this.cityRepository.list(req.query);
        res.status(data.status).send(data);
    }
}

module.exports = new CityController();