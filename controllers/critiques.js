const request = require('request');
const Critique = require('../models/critique');
const User = require('../models/user');

const ROOT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

module.exports = {
	new: newCritique,
	create
};

function newCritique(req, res, next) {
	artId = req.params.id;
	request(`${ROOT_URL}${artId}`, function(err, response, body) {
		artObj = JSON.parse(body);
		res.render('critiques/new', {
			objectBody: artObj,
			user: req.user,
			name: req.query.name
		});
	});
}

function create(req, res) {
	console.log(req.body.artId);
	request(`${ROOT_URL}${req.body.artId}`, function(err, response, body) {
		artObj = JSON.parse(body);
		console.log(`This is the art url: ${artObj.primaryImageSmall}`);
		newCritique = new Critique({
			critic: req.user.name,
			publishDate: new Date(),
			artworkImage: artObj.primaryImageSmall,
			artistName: artObj.artistDisplayName,
			artworkPublishDate: artObj.objectEndDate,
			artworkTitle: artObj.title,
			critiqueBody: req.body.critiqueBody,
			critiqueRating: req.body.rating
		});
		User.findById(req.user._id, function(err, user) {
			user.critiques.push(newCritique);
			console.log(user);
		});
	});
	res.redirect('/');
}

// function create(req, res) {
// 	Movie.findById(req.params.id, function(err, movie) {
// 		movie.reviews.push(req.body);
// 		movie.save(function(err) {
// 			res.redirect(`/movies/${movie._id}`);
// 		});
// 	});
// }
