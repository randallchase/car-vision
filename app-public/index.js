/*var express = require('express');
var app     = express();
var request = require("request");
var fs      = require('fs');
var pg      = require('pg');

// Create a file called "credentials.json" to store password in. should be in the form {'sighthound-key': 'YOUR-SPECIFIC-KEY'}.
// The credentials.json file is in the .gitignore so that it will not get loaded to the github.
var credentialsJSON = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

// setup directory used to serve static files
app.use(express.static('public'));

var cors = require('cors');
app.use(cors());


function writeCarsToDB(res) {
    // Write

};




// TODO: Create a loop to cycle through the pictures and analyze, returning values.
//

var options = { method: 'POST',
    url: 'https://dev.sighthoundapi.com/v1/recognition',
    qs: { objectType: 'vehicle' },
    headers:
        {
            'Content-Type': 'application/octet-stream',
            'X-Access-Token': credentialsJSON['sighthound-key']
        },
    body: image};


// Because request is asynchronous, must do all actions with response inside of the callback function
request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);

});



// TODO: Write car event to DB

var port = 8080;

app.listen(port, function() {
    console.log('Running on port: ' + port)
});

// resultObj.objects[0].vehicleAnnotation.bounding.vertices
// resultObj.objects[0].vehicleAnnotation.recognitionConfidence
// resultObj.objects[0].vehicleAnnotation.attributes.system. // make // model // color // vehicleType

*/