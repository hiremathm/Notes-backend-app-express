const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/Note')
const authUser = require('../app/middlewares/authentication')

router.get('/notes/view_all_notes', notesController.view_all_notes)
router.get('/notes', authUser, notesController.list)
router.post('/notes', notesController.create)
router.get('/notes/:id', authUser, notesController.show)
router.put('/notes/:id', notesController.update)
router.delete('/notes/remove', notesController.remove)
router.delete('/notes/:id', authUser, notesController.destroy)
module.exports = router