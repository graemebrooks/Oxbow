var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

router.get('/discover', indexCtrl.discover);

router.get('/about', indexCtrl.about);

module.exports = router;
