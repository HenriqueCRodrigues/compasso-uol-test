const Customer = require('../models/customer');
const City = require('../models/city');
const Traits = require('../traits');

class CustomerRepository {

    store = async (req) => {
        try {
            req.createdAt = new Date().toDateString();
            if (req.city) {
                req.city_id = req.city;
            }

            const responseAdvancedCity = await Traits.advancedSearchCity(req, false);
            req.city = responseAdvancedCity.city[0];
            if(!req.city) {
                return {status: 422, data: {message: 'Invalid City(Not Found)!'}};
            }

            if (new Date(req.birthedAt).toDateString() == 'Invalid Date') {
                return {status: 422, data: {message: 'Invalid Birthdate!'}};
            }

            const customer = await Customer.create(req);
            return {status: 200, data: customer};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }

    list = async (req) => {
        try {
            let searchCondition = {};
            const arrayAttributes = ['_id', 'fullName', 'age', 'birthedAt', 'createdAt', 'updatedAt'];
            arrayAttributes.forEach(param => {
                if (req[param]) {
                    searchCondition[param] = new RegExp('.*' + req[param] + "*.", "i");
                }
            });

            /*
            let objectCity = {};
            if (req.city_uf) {
                    objectCity = {uf: req.city_uf}; 
            } else if (req.city_name) {
                objectCity = {name: req.city_name};
            } else if (req.city_id) {
                objectCity = {_id: req.city_id};
            }

            const city = await City.find(objectCity, {_id: 1});

            if (city.length == 1) {
                searchCondition._id = city; 
            } else if (city.length > 1) {
                searchCondition.city = city._id;
            } else {
                searchCondition.city = city._id;
            }
            */
            let options = {
                select: '_id fullName age city birthedAt',
                populate: {
                    path: 'city',
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

            const customer = await Customer.paginate(searchCondition, options);
            return {status: 200, data: customer};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }
}


module.exports = CustomerRepository;