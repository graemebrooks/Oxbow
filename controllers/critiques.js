const request = require('request');

const ROOT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

module.exports = {
	new: newCritique
};

function newCritique(req, res, next) {
	artId = req.params.id;
	request(`${ROOT_URL}${artId}`, function(err, response, body) {
		artObj = JSON.parse(body);
		res.render('critiques/new', { objectBody: artObj });
	});
}
