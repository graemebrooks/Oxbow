const request = require('request');

const ROOT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

module.exports = {
	index,
	about,
	discover
};

function index(req, res) {
	res.render('index');
}

function about(req, res) {
	res.render('about');
}

function discover(req, res) {
	let options = {
		url: `https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1900&dateEnd=2000&objectName=Painting&hasImages=true&q=a`,
		headers: {
			'User-Agent': 'kelsobrooks'
		}
	};
	console.log('trying...');
	request(options, function(err, response, body) {
		// console.log(options.url);
		if (err) {
			console.log(err);
		}
		let art = JSON.parse(body);
		console.log(art.total);
		request(
			`https://collectionapi.metmuseum.org/public/collection/v1/objects/${art.objectIDs[
				Math.floor(Math.random() * art.total)
			]}`,
			function(innerErr, objectResponse, objectBody) {
				// console.log(`${ROOT_URL}${art.objectIDs[Math.floor(Math.random() * art.total)]}`);
				artObj = JSON.parse(objectBody);
				// console.log(artObj.primaryImage);
				res.render('discover', { objectBody: artObj });
			}
		);
	});
}
