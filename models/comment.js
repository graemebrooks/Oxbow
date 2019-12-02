const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		commenter: {
			type: String
		},
		commentBody: {
			type: String
		},
		commentDate: {
			type: Date
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
