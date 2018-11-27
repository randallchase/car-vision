const express   = require('express');
const router    = express.Router();
var db          = require('../../queries');

router.get('/api/cars', db.getAllCars);
router.post('/api/cars/', db.createCar);
// router.put('/api/cars/:id', db.updateCar);
// router.delete('/api/cars/:id', db.removeCar);

router.get('/', function (req, res) {
    res.render('index', {title: 'Working Page'});
});

module.exports = router;