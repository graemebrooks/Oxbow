const express = require('express');
const router = express.Router();
const critiqueCtrl = require('../controllers/critiques');

router.get('/:id/new', critiqueCtrl.new);
router.post('/', critiqueCtrl.create);

module.exports = router;
