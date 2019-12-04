const request = require('request');
const Critique = require('../models/critique');
const User = require('../models/user');
const Comment = require('../models/comment');

const ROOT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

module.exports = {
	new: newCritique,
	create,
	show,
	delete: deleteCritique,
	update,
	updateForm,
	createComment
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
	request(`${ROOT_URL}${req.body.artId}`, function(err, response, body) {
		artObj = JSON.parse(body);
		newCritique = new Critique({
			critic: req.user.name,
			criticId: req.user._id,
			publishDate: new Date(),
			artworkImage: artObj.primaryImageSmall,
			artistName: artObj.artistDisplayName,
			artworkPublishDate: artObj.objectEndDate,
			artworkTitle: artObj.title,
			critiqueTitle: req.body.title,
			critiqueBody: req.body.critiqueBody,
			critiqueRating: req.body.rating
		});
		User.findById(req.user._id, function(err, user) {
			user.critiques.push(newCritique._id);
			user.save(function(err, user) {
				res.redirect(`/critiques/${newCritique._id}`);
			});
			newCritique.save(function(err, crit) {});
		});
	});
}

function show(req, res) {
	id = req.params.id;
	Critique.findById(id).populate('comments').exec(function(err, critique) {
		res.render('critiques/show', {
			user: req.user,
			name: req.query.name,
			critique: critique,
			comments: critique.comments
		});
	});
}

function deleteCritique(req, res) {
	User.findById(req.user._id, function(err, user) {
		deletedCrit = user.critiques.indexOf(req.params.id);
		user.critiques.splice(deletedCrit, 1);
		user.save(function(err, user) {});
	});
	Critique.findByIdAndDelete(req.params.id, function(err, crit) {
		res.redirect('/gallery');
	});
}

function update(req, res) {
	Critique.findByIdAndUpdate(req.params.id, req.body, function(err, crit) {
		res.redirect('/gallery');
	});
}

function updateForm(req, res) {
	Critique.findById(req.params.id, function(err, critique) {
		res.render('critiques/update', {
			user: req.user,
			name: req.query.name,
			critique: critique
		});
	});
}

function createComment(req, res) {
	newComment = new Comment({
		commenterName: req.user.name,
		commenterId: req.user._id,
		commentBody: req.body.commentBody,
		commentDate: new Date()
	});
	newComment.save(function(err, comment) {});
	Critique.findById(req.params.id, function(err, critique) {
		critique.comments.push(newComment._id);
		critique.save(function(err, crit) {
			res.redirect(`/critiques/${req.params.id}`);
		});
	});
}
