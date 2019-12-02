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
		critiques: [ { type: Object } ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
