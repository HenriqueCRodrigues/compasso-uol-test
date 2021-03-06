const City = require('../models/city');
const State = require('../models/state');
const Traits = require('../traits');

class CityRepository {

    store = async (req) => {
        try {
            req.createdAt = new Date().toDateString();
            req.state = (await Traits.advancedSearchState(req, false))[0];
            if(!req.state) {
                return {status: 422, data: {message: 'Invalid State(Not Found)!'}};
            }

            const city = await City.create(req);
            return {status: 200, data: city};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }

    list = async (req) => {
        try {
            let searchCondition = {};
            const arrayAttributes = ['_id', 'name', 'createdAt', 'updatedAt'];
            arrayAttributes.forEach(param => {
                if (req[param]) {
                    if (param == '_id') {
                        searchCondition[param] = req[param];
                    } else {
                        searchCondition[param] = new RegExp('.*' + req[param] + "*.", "i");
                    }
                }
            });

            const state = await Traits.advancedSearchState(req);

            const states = state.map(state => {
                return state._id;
            });
            
            searchCondition.state = { $in: states };

            let options = {
                select: '_id name state',
                populate: {
                    path: 'state',
                    select: '_id name uf'
                }
            };
            delete req.select;
            const arrayPagination = ['offset', 'limit', 'page'];
            arrayPagination.forEach(param => {
                if (req[param]) {
                    options[param] = req[param];
                }
            });

            const city = await City.paginate(searchCondition, options);
            return {status: 200, data: city};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }
}


module.exports = CityRepository;