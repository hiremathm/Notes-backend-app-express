const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/Note')

router.get('/notes', notesController.list)
router.post('/notes', notesController.create)
router.get('/notes/:id', notesController.show)
router.put('/notes/:id', notesController.update)
router.delete('/notes/:id', notesController.destroy)
module.exports = router