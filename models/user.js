const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String
		},
		googleId: {
			type: String
		},
		email: {
			type: String
		},
		critiques: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Critique'
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
