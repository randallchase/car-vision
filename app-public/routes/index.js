// run with command "npm run start:dev"
var express     = require('express');
var router      = express.Router();
var db          = require('../queries');
var request     = require('request');
var fs          = require('fs');

var credentialsJSON = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

router.get('/api/cars/', db.getAllCars);
router.get('/api/image/:image_id', db.getImageCars);
router.get('/api/cars/:id', db.getSingleCar);
router.post('/api/cars/', db.createCar);

router.post('/image', function (req, res) {
    res.setTimeout(0); // no timeout

    if (req.body) {
        //console.log(req);
        var image = req.body;
        console.log(image);
        var options = {
            method: 'POST',
            url: 'https://dev.sighthoundapi.com/v1/recognition',
            qs: { objectType: 'vehicle' },
            headers:
                {
                    'Content-Type': 'application/json',
                    'X-Access-Token': credentialsJSON['sighthound-key']
                },
            body: JSON.stringify(image)
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log("received request ");

            var jsonBody = JSON.parse(body) ;
            console.log(jsonBody.objects);
            console.log('reducing response');
            var reducedData = extractValues(jsonBody.objects);
            console.log(reducedData);
            console.log('writing cars to db');
            db.writeImageCars

            // res.send()
        });
        res.sendStatus(200);
    }
});

/*
router.post('/image', function (req, res) {
    console.log('new request bla bla');
    console.log(req);
    var image = req;
    // console.log("Sent Request");
    console.log("Print: " + image);
    /*
    // fs.createWriteStream("./", image);
    var options = {
        method: 'POST',
        url: 'https://dev.sighthoundapi.com/v1/recognition',
        qs: { objectType: 'vehicle' },
        headers:
            {
                'Content-Type': 'application/json',
                'X-Access-Token': 't3hKKlkKmyS7p2JzRB7WRRUFPbBdEV5YlMo7'
            },
        body: JSON.stringify(image)};

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log("received request " +body)

        var json = JSON.parse(body) ;
        console.log(json.objects);
        extractValues(json.objects);
    });
});
*/
function extractValues(response) {
    let reducedData = [];
    console.log(response);
    response.forEach(function(element) {
        let tempData = {};
        tempData['make']        = element.vehicleAnnotation.attributes.system.make.name;
        tempData['car_model']   = element.vehicleAnnotation.attributes.system.model.name;
        tempData['color']       = element.vehicleAnnotation.attributes.system.color.name;
        tempData['veh_type']    = element.vehicleAnnotation.attributes.system.vehicleType;
        tempData['confidence']  = element.vehicleAnnotation.recognitionConfidence;
        reducedData.push(tempData);
    });
    return reducedData;
}
// router.put('/api/cars/:id', db.updateCar);
// router.delete('/api/cars/:id', db.removeCar);

router.get('/', function (req, res) {
    res.render('index', {title: 'Working Page'});
});

module.exports = router;