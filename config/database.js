const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/notes-app',  { useNewUrlParser: true })
	.then(() => {
		console.log('Connection to mongodb is established.')
	})
	.catch((err) => {
		console.log('Un Able to connect mongodb.')
	})

module.exports = {
	mongoose
}
