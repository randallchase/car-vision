const promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/public/server/config/config.json`)[env];

const pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:65044/car_vis_dev';
var db = pgp(connectionString);

module.exports = {
    getAllCars: getAllCars,
    createCar: createCar,
    // updateCar: updateCar,
    // removeCar: removeCar
};

function getAllCars(req, res, next) {
    db.any('SELECT * from cars_pass')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL cars'
                })
        })
        .catch(function (err) {
            return next(err);
        });
}

function createCar(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('INSERT into cars(make, model, year, type)' +
        'values(${make}, ${model}, ${year}, ${type}',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one car'
                })
        })
        .catch(function (err) {
            return next(err);
        });
}