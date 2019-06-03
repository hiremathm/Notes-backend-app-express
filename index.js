const express = require('express');
const cors = require('cors');
const {mongoose} =  require('./config/database')
// const Note = require('./app/models/Note')
// const notesRouter = require('./app/controllers/Note')
const router = require('./config/routes')
const categoriesRouter = require('./app/controllers/Categories')
const tagsRouter = require('./app/controllers/Tags')
const userRouter = require('./app/controllers/Users')

const port = 3001
const app = express();

app.use(cors())
app.use(express.json())

app.use('/', router)
app.use('/categories', categoriesRouter)
app.use('/tags', tagsRouter)
app.use('/users', userRouter)


app.get('/', (req, res) => {
	res.send('Welcome the Note App.')
})
app.listen(port, () => {
	console.log('The server is runnig on ', port)
})