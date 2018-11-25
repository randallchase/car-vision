var express = require('express');
var app     = express();
var request = require("request");
var fs      = require('fs');
var credentialsJSON = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

// setup directory used to serve static files
app.use(express.static('public'));

var cors = require('cors');
app.use(cors());


var image = fs.createReadStream('./project_images/Motor-Trend-group-photo.jpg');

var options = { method: 'POST',
    url: 'https://dev.sighthoundapi.com/v1/recognition',
    qs: { objectType: 'vehicle' },
    headers:
        {
            'Content-Type': 'application/octet-stream',
            'X-Access-Token': credentialsJSON['sighthound-key']
        },
    body: image};

var results = request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

resultObj = JSON.parse(results.response.body)

for (var i = 0; i < resultObj.objects, i++) {

}

// resultObj.objects[0].vehicleAnnotation.bounding.vertices
// resultObj.objects[0].vehicleAnnotation.recognitionConfidence
// resultObj.objects[0].vehicleAnnotation.attributes.system. // make // model // color // vehicleType