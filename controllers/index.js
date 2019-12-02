const request = require('request');
const User = require('../models/user');

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
	gallery
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
			// console.log(`${ROOT_URL}${art.objectIDs[Math.floor(Math.random() * art.total)]}`);
			artObj = JSON.parse(objectBody);
			// console.log(artObj.primaryImage);
			res.render('discover', {
				objectBody: artObj,
				user: req.user,
				name: req.query.name
			});
		}
	);
}

function gallery(req, res) {
	console.log(req.user.critiques);
	res.render('gallery', {
		user: req.user,
		name: req.query.name
	});
}
