const State = require('../models/state');

class StateRepository {

    store = async (req) => {
        try {
            req.createdAt = new Date().toDateString();
            const state = await State.create(req);
            return {status: 200, data: state};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }

    list = async (req) => {
        try {
            let searchCondition = {};
            const arrayAttributes = ['_id', 'name', 'uf', 'createdAt', 'updatedAt'];
            arrayAttributes.forEach(param => {
                if (req[param]) {
                    if (param == '_id') {
                        searchCondition[param] = req[param];
                    } else if(param == 'uf') {
                        searchCondition[param] = new RegExp(req[param], "i"); 
                    } else {
                        searchCondition[param] = new RegExp('.*' + req[param] + "*.", "i");
                    }
                }
            });


            let options = {
                select: '_id name uf'
            };
            delete req.select;
            const arrayPagination = ['offset', 'limit', 'page'];
            arrayPagination.forEach(param => {
                if (req[param]) {
                    options[param] = req[param];
                }
            });

            const state = await State.paginate(searchCondition, options);
            return {status: 200, data: state};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }
}

module.exports = StateRepository;