var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var pug         = require('pug');
var routes      = require('./routes/index.js');

var app         = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'tim.png')));

// Log requests to the console
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
            .json({
                status: 'error',
                message: err
            });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: err.message
        });
});
/*
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));
*/
module.exports = app;

function extractValues(response) {
    let reducedData = [];
    console.log(response);
    response.forEach(function(element) {
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