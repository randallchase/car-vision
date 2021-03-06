var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

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

function getImageCars(req, res, next) {
    var imageID = parseInt(req.params.image_id);
    db.any('SELECT make, car_model, color, veh_type, confidence FROM cars_pass WHERE image_id = $1', imageID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved image SET'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleCar(req, res, next) {
    var carID = parseInt(req.params.id);
    db.one('SELECT * from cars_pass WHERE id = $1', carID)
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
    return db.none('INSERT INTO cars_pass(image_id, make, car_model, color, veh_type, confidence)' +
        'VALUES(${image_id}, ${make}, ${car_model}, ${color}, ${veh_type}, ${confidence})',
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

function getAggData (req, res, next) {
    var imageID = parseInt(req.params.image_id);
    var query = 'SELECT ac.cat_count as cat_count, ac.ad_category AS ad_category,a.description AS description from ad_cats a JOIN (SELECT COUNT(i.ad_category) AS cat_count, i.ad_category FROM image_car_data i WHERE i.image_id = $1 GROUP BY ad_category ORDER BY cat_count DESC) ac ON ac.ad_category = a.id';

    db.any(query, imageID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'succes',
                    data: data,
                    message: 'Retreived image ad stats'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}


function writeImageCars(req, res, next) {
    req.body.age = parseInt(res.body.age);
    var cs = new pgp.helpers.ColumnSet(['make', 'car_model', 'veh_type', 'confidence'], {table: 'cars_pass'});
    console.log(req.body);
    var records = req.body.length;
    var values = req.body;
    var insert_query = pgp.helpers.insert(values, cs);
    var update_query = 'UPDATE cars_pass SET image_id =( CASE WHEN ((SELECT MAX(image_id) FROM cars_pass) IS NULL AND image_id IS NULL) THEN 1 ELSE ((SELECT MAX(image_id) from cars_pass) + 1) END ) WHERE image_id IS NULL';

    return db.tx(t => {
        return t.batch([
            t.none(insert_query),
            t.none(update_query)
        ])
    })
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted ' + records + 'cars'
                })
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllCars: getAllCars,
    getImageCars: getImageCars,
    getSingleCar: getSingleCar,
    createCar: createCar,
    writeImageCars: writeImageCars,
    getAggData: getAggData
};