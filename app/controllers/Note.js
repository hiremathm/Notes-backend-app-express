const express = require('express')
const Note = require('../models/Note')
const Router = express.Router()
//List All Notes
// Router.get('/', (req, res) => {
// 	Note.find()
// 		.then((notes) => {
// 			res.send(notes)
// 		})
// 		.catch((err) => {
// 			res.send(err)
// 		})
// })
// //New Note
// Router.post('/', (req, res) => {
// 	const body = req.body;
// 	const note = new Note(body)
// 	note.save()
// 		.then((note) => {
// 			res.send(note)
// 		})
// 		.catch((err) => {
// 			res.send(err)
// 		})
// })

// Router.get('/:id',(req, res) => {
// 	const id = req.params.id;
// 	Note.findById(id) 
// 		.then((doc) => {
// 			res.json(doc)
// 		})
// 		.catch((err) => {
// 			res.send(err)
// 		})
// })

// Router.delete('/:id', (req, res) => {
// 	const id = req.params.id;
// 	Note.findByIdAndRemove(id)
// 		.then((doc) => {
// 			res.json({notice: "Record deleted successfully."})
// 		})
// 		.catch((err) => {
// 			res.json(err)
// 		})
// })

// Router.put('/:id', (req, res) => {
// 	const id = req.params.id;
// 	const body = req.body;
// 	Note.findByIdAndUpdate(id, {$set: body}, {new: true})
// 		.then((doc) => {
// 			res.json({notice: "Record updated successfully.", document: doc})
// 		})
// 		.catch((err) => {
// 			res.json(err)
// 		})
// })

// module.exports = Router


module.exports.view_all_notes = function(req, res){
	Note.find()
		.then((notes) => {
			res.send(notes)
		})
		.catch((err) => {
			res.send(err)
		})
}

module.exports.list = function(req, res){
	const user = req.user
	Note.find({user: user._id})
		.then((notes) => {
			res.send(notes)
		})
		.catch((err) => {
			res.send(err)
		})
}

module.exports.create = function(req, res){
	const body = req.body;
	const note = new Note(body)
	note.save()
		.then((note) => {
			res.json(note)
		})
		.catch((err) => {
			res.send(err)
		})
}

module.exports.show = function(req, res){
	const id = req.params.id;
	const user = req.user
	Note.findOne({user: user._id, _id: id}).populate('category').populate('tags.tag', ['name'])
		.then((doc) => {
			res.json(doc)
		})
		.catch((err) => {
			res.send(err)
		})
}

module.exports.update = function(req, res){
	const id = req.params.id;
	const body = req.body;
	Note.findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
		.then((doc) => {
			res.json({notice: "Record updated successfully.", document: doc})
		})
		.catch((err) => {
			res.json(err)
		})
}

module.exports.remove = (req, res) => {
	const noteId = req.query.noteId;
	const tagId = req.query.tagId;
	Note.findByIdAndUpdate({_id: noteId}, {$pull: {tags: {_id: tagId}}}, {new: true}).populate('category').populate('tags.tag', ['name'])
		.then((doc) => {
			res.json({notice: "Tag removed successfully.", document: doc})
		})
		.catch((err) => {
			res.json(err)
		})
}

module.exports.destroy = function(req, res) {
	const id = req.params.id;
	const user = req.user
	Note.findOneAndRemove({user: user._id, _id: id})
		.then((doc) => {
			res.json({notice: "Record deleted successfully."})
		})
		.catch((err) => {
			res.json(err)
		})
}