var express = require('express');
var app     = express();
var cors = require('cors');
app.use(cors());
var fs = require('fs');
var credentials_JSON = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

// Read in API key from JSON to prevent storing credentials in GitHub
var algo_key = credentials_JSON['algorithmia-key'];



var Algorithmia = require("algorithmia");

var input = "https://st.motortrend.com/uploads/sites/10/2015/09/2016-Honda-Accord-Touring-MT-promo.jpg";
Algorithmia.client(algo_key)
    .algo("LgoBE/CarMakeandModelRecognition/0.3.15")
    .pipe(input)
    .then(function(response) {
        console.log(response.get());
    });

/*
var input = {
   "input_file":"data://media/videos/kenny_test.mp4",
   "output_file":"data://.algo/temp/kenny_test_nudity.json",
   "algorithm":"algo://LgoBE/CarMakeandModelRecognition/0.3.15",
   "fps": 1
};
Algorithmia.client(algo_key)
    .algo("media/VideoMetadataExtraction/0.6.0")
    .pipe(input)
    .then(function(response) {
        console.log(response.get());
    });
*/
