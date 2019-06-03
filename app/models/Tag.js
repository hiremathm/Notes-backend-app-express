const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
	name: {
		type: String
	},
	notes: [{
			note: {
					type: Schema.Types.ObjectId,
					ref: 'Note'
			}}
	]
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag