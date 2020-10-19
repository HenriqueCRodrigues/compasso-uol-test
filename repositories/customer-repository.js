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

            const responseAdvancedCity = await Traits.advancedSearchCity(req);
            req.city = responseAdvancedCity.city[0];
            if(!responseAdvancedCity.state || !responseAdvancedCity.state.length) {
                return {status: 422, data: {message: 'Invalid State(Not Found)!'}};
            } else if(!responseAdvancedCity.city || !responseAdvancedCity.city.length) {
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
            let responseAdvancedCity = {};

            const arrayAttributes = ['_id', 'fullName', 'age', 'birthedAt', 'createdAt', 'updatedAt'];
            arrayAttributes.forEach(param => {
                if (req[param]) {
                    searchCondition[param] = new RegExp('.*' + req[param] + "*.", "i");
                }
            });

            if (req.city_name || req.city_id || req.city || req.state_id || req.state_uf || req.state_name) {
                responseAdvancedCity = await Traits.advancedSearchCity(req);
            }

            if (responseAdvancedCity.hasOwnProperty('city')) {
                if (!responseAdvancedCity.state || !responseAdvancedCity.city) {
                    searchCondition = {_id: null};
                } else {
                    const cities = responseAdvancedCity.city.map(city => {
                        return city._id;
                    });
                    searchCondition.city = { $in: cities };
                }
            }
            


            let options = {
                select: '_id fullName age city birthedAt',
                populate: {
                    path: 'city',
                    select: '_id name uf'
                }
            };

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

    get = async (id) => {
        try {
            const customer = await Customer.findOne({_id: id});
            
              if (customer) {
                return {status: 200, data: customer};
            }

            return {status: 404, data: 'Customer not found'};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }

    update = async (id, req) => {
        try {
            const body = {
                fullName: req.fullName || req.name
            };
            const customer = await Customer.findOneAndUpdate({_id: id}, body, {
                returnOriginal: false
              });
            
              if (customer) {
                return {status: 200, data: customer};
            }

            return {status: 404, data: 'Customer not found'};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }

    delete = async (id) => {
        try {
            const customer = await Customer.findOneAndDelete({_id: id});
            if (customer) {
                return {status: 200, data: `Customer ID(${id}) Deleted`};
            }

            return {status: 404, data: 'Customer not found'};
        } catch (err) {
            return {status: 500, data: err.stack || err};
        }
    }
}


module.exports = CustomerRepository;