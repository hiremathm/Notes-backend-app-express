const express = require('express')
const Router = express.Router()
const Tag = require('../models/Tag')

Router.get('/', (req, res) => {
	Tag.find()
		.then(response => res.json(response))
})

Router.get('/:id', (req, res) => {
	const id = req.params.id
	Tag.findById(id).populate('notes.note', ['title'])
		.then(tag => res.json(tag))
})
	
Router.delete('/:id', (req, res) => {
	const id = req.params.id
	Tag.findByIdAndRemove(id)
		.then(tags => res.json(tags))
})

Router.put('/:id', (req, res) => {
	const id = req.params.id
	const body = req.body
	Tag.findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
		.then(tag => res.json({notice: "Record Updated successfully", document: tag}))
})
Router.post('/', (req, res) => {
	const body = req.body
	const tag = new Tag(body)
	tag.save()
		.then(response => res.json(response) )
})

module.exports = Router