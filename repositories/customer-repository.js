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
            if(!responseAdvancedCity.state) {
                return {status: 422, data: {message: 'Invalid State(Not Found)!'}};
            } else if(!responseAdvancedCity.city) {
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
}


module.exports = CustomerRepository;