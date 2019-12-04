const request = require('request');
const User = require('../models/user');
const Critique = require('../models/critique');

const ROOT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

let collection = [];
request('https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=*', function(
	err,
	response,
	body
) {
	if (err) {
		console.log(err);
	}
	collection = JSON.parse(body);
});

module.exports = {
	index,
	about,
	discover,
	gallery,
	discourse
};

function index(req, res, next) {
	res.render('index', {
		user: req.user,
		name: req.query.name
	});
}

function about(req, res) {
	res.render('about', {
		user: req.user,
		name: req.query.name
	});
}

function discover(req, res) {
	request(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${collection.objectIDs[
			Math.floor(Math.random() * collection.total)
		]}`,
		function(innerErr, objectResponse, objectBody) {
			artObj = JSON.parse(objectBody);
			res.render('discover', {
				objectBody: artObj,
				user: req.user,
				name: req.query.name
			});
		}
	);
}

function gallery(req, res) {
	User.findById(req.user._id).populate('critiques').exec(function(err, user) {
		res.render('gallery', {
			user: req.user,
			name: req.query.name,
			critiques: user.critiques
		});
	});
}

function discourse(req, res) {
	Critique.find({}, function(err, critiques) {
		res.render('discourse', {
			user: req.user,
			name: req.query.name,
			critiques
		});
	});
}
