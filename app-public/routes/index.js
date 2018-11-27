var express   = require('express');
var router    = express.Router();
var db          = require('../queries');


router.get('/api/cars/', db.getAllCars);
router.get('/api/cars/:id', db.getSingleCar);
router.post('/api/cars/', db.createCar);
// router.put('/api/cars/:id', db.updateCar);
// router.delete('/api/cars/:id', db.removeCar);

router.get('/', function (req, res) {
    res.render('index', {title: 'Working Page'});
});

module.exports = router;