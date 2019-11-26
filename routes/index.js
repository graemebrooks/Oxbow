var express = require('express');
var router = express.Router();
var passport = require('passport');
var indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

router.get('/discover', indexCtrl.discover);

router.get('/about', indexCtrl.about);

router.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/error'
	})
);

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
