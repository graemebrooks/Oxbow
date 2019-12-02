const express = require('express');
const router = express.Router();
const critiqueCtrl = require('../controllers/critiques');

router.get('/new/:id', critiqueCtrl.new);
router.get('/edit/:id', critiqueCtrl.updateForm);
router.get('/:id', critiqueCtrl.show);
router.post('/', critiqueCtrl.create);
router.put('/:id', critiqueCtrl.update);
router.delete('/:id', critiqueCtrl.delete);

router.post('/:id/comments', critiqueCtrl.createComment);

module.exports = router;
