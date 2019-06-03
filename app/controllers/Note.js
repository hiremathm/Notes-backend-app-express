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


module.exports.list = function(req, res){
	Note.find()
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
	Note.findById(id).populate('category').populate('tags.tag', ['name'])
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

module.exports.destroy = function(req, res) {
	const id = req.params.id;
	Note.findByIdAndRemove(id)
		.then((doc) => {
			res.json({notice: "Record deleted successfully."})
		})
		.catch((err) => {
			res.json(err)
		})
}