const Comment = require('../models/comment');

module.exports = {
	delete: deleteComment
};

function deleteComment(req, res) {
	Comment.findByIdAndDelete(req.params.id, function(err, comment) {
		res.redirect('/gallery');
	});
}
