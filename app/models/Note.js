const mongoose = require('mongoose');
const Tag = require('./Tag')
//Schema object constructor function
const Schema = mongoose.Schema

const NoteSchema = new Schema({
	//field : {configuration}
	title: {
		type: String,
		required: true
	},
	body: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	tags: [{tag: {type: Schema.Types.ObjectId, ref: 'Tag', required: true}}]
})

//Lifef Cycle Methods

//pre('validate', function(){})
//post('validate', function(){})
//pre('save', function(){})
//post('save', function(){})
//pre('remove', function(){})
//post('remove', function(){})

NoteSchema.post('save', function(){
	const note = this
	note.tags.forEach(function(tag) {
		Tag.findById(tag.tag)
			.then(tag => {
				tag.notes.push({note: note._id})
				tag.save()
			})
	})
	next()
})

//Model based on the schema
const Note = mongoose.model('Note', NoteSchema)

module.exports = Note