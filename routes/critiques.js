const express = require('express');
const router = express.Router();
const critiqueCtrl = require('../controllers/critiques');

router.get('/new/:id', critiqueCtrl.new);
router.get('/show', critiqueCtrl.show);
router.post('/', critiqueCtrl.create);

module.exports = router;
