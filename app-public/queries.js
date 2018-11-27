var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(`${__dirname}/public/server/config/config.json`)[env];

const pgp = require('pg-promise')(options);

var db = pgp(config);


function getAllCars(req, res, next) {
    db.any('SELECT * from cars_pass')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL cars'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleCar(req, res, next) {
    var carID = parseInt(req.params.id);
    db.one('SELECT * from cars_pass where id = $1', carID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE car'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createCar(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('INSERT INTO cars_pass(make, carModel, color, vehType, confidence)' +
        'VALUES(${make}, ${carModel}, ${color}, ${vehType}, ${confidence})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted ONE car'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllCars: getAllCars,
    getSingleCar: getSingleCar,
    createCar: createCar,
    // updateCar: updateCar,
    // removeCar: removeCar
};