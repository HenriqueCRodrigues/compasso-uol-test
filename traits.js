const State = require('./models/state');
const City = require('./models/city');

async function advancedSearchState(req, getAll = true) {
    let objectState = {};
    if (!getAll) {
        objectState = {_id: null};
    }

    if (req.state_uf) {
        objectState = {uf: new RegExp(req.state_uf, "i")}; 
    } else if (req.state_name) {
        objectState = {name: new RegExp('.*' + req.state_name + "*.", "i")};
    } else if (req.state_id) {
        objectState = {_id: req.state_id};
    }

    return await State.findOne(objectState);
}

async function advancedSearchCity(req, getAll = true) {
    let objectCity = {};
    if (!getAll) {
        objectCity = {_id: null};
    }
    const state = await this.advancedSearchState(req);
    if (state) {
        if (req.city_name) {
            objectCity = {name: new RegExp('.*' + req.city_name + "*.", "i")};
        } else if (req.city_id) {
            objectCity = {_id: req.city_id};
        }
    }

    return {city: await City.find(objectCity), state};
}

module.exports = {
    advancedSearchState,
    advancedSearchCity
}