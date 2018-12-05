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
var credentialsJSON = require(`${__dirname}/credentials.json`, 'utf8');
var request = require('request-promise');

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

function writeImageCars(req, res, next) {
    req.body.age = parseInt(res.body.age);
    // console.log(req);
    return db.none('INSERT INTO cars_pass(image_id, make, car_model, color, veh_type, confidence)' +
        'VALUES((SELECT MAX(image_id) FROM cars_pass) + 1, ${make}, ${car_model}, ${veh_type}, ${confidence})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted ' + req.length + 'cars'
                })
        })
        .catch(function (err) {
            return next(err);
        });
}
/*
var image = fs.createReadStream('public/project_images/motor-trend-group.jpg');
var cvOptions = {
    method: 'POST',
    url: 'https://dev.sighthoundapi.com/v1/recognition',
    qs: { objectType: 'vehicle' },
    headers:
        {
            'Content-Type': 'application/octet-stream',
            'X-Access-Token': credentialsJSON['sighthound-key']
        },
    body: image
};


function extractValues(response) {
    let reducedData = [];
    response.objects.forEach(function(element) {
        let tempData = {};
        tempData['make']        = element.vehicleAnnotation.attributes.system.make.name;
        tempData['car_model']   = element.vehicleAnnotation.attributes.system.model.name;
        tempData['color']       = element.vehicleAnnotation.attributes.system.color.name;
        tempData['veh_type']    = element.vehicleAnnotation.attributes.system.vehicleType;
        tempData['confidence']  = element.vehicleAnnotation.attributes.recognitionConfidence;
        reducedData.append(tempData);
    });
    return reducedData;
}

function analyzeImage(options) {
    return request(options)
        .then(function (response) {
            return extractValues(response);
        })
        .catch(function (err) {
            return err;
        });
}

analyzeImage(cvOptions)
    .then(extractValues(result))
    .then(createCar())
*/
module.exports = {
    getAllCars: getAllCars,
    getImageCars: getImageCars,
    getSingleCar: getSingleCar,
    createCar: createCar,
    writeImageCars: writeImageCars
    //analyzeImage: analyzeImage
    // updateCar: updateCar,
    // removeCar: removeCar
};