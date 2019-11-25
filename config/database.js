const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

// database connection event
try {
	mongoose.connection.on('connected', function() {
		console.log(`Mongoose connected to: Oxbow Database`);
	});
} catch (error) {
	console.error(error);
}

module.exports = mongoose;
