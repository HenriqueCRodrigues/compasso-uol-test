const State = require('./models/state');
const City = require('./models/city');

async function advancedSearchState(req, getAll = true) {
    const objectState = stateFormat(req, getAll);
    return await State.find(objectState);
}

function stateFormat(req, getAll) {
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

    return objectState;
}

async function advancedSearchCity(req, getAll = true) {
    return cityFormat(req, getAll);
}

async function cityFormat(req, getAll) {
    let objectCity = {};
    if (!getAll) {
        objectCity = {_id: null};
    }

    if (req.city_name) {
        objectCity = {name: new RegExp('.*' + req.city_name + "*.", "i")};
    } else if (req.city_id) {
        objectCity = {_id: req.city_id};
    }

    const state = await advancedSearchState(req, getAll);
    let city = null;

    if (state) {
        objectCity.state = state;
        city = await City.find(objectCity)
    }
    
    return {city, state};
}

module.exports = {
    advancedSearchState,
    advancedSearchCity
}