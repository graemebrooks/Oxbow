const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.delete('/:id', commentsCtrl.delete);

module.exports = router;
