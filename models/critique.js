const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const critiqueSchema = new Schema(
	{
		critic: {
			type: String
		},
		publishDate: {
			type: Date
		},
		artworkImage: {
			type: String
		},
		artistName: {
			type: String
		},
		artworkPublishDate: {
			type: String
		},
		artworkTitle: {
			type: String
		},
		critiqueBody: {
			type: String
		},
		critiqueRating: {
			type: Number,
			min: 1,
			max: 5
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Critique', critiqueSchema);
