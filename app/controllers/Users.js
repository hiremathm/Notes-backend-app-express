const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const authUser = require('../middlewares/authentication')
//Account Route
//localhost:3001/users/account


Router.get('/account', authUser , (req, res) => {
	const {user} = req
	res.send(user)
})

Router.delete('/logout', authUser, (req, res) => {
	const {user , token} = req
	User.findByIdAndUpdate(user._id, {$pull: {tokens: { token: token }}})
		.then(user => {
			res.send({notice: "Successfully deleted"})
		})
		.catch(error => {
			res.status('401').send(error)
		})
})

//Get Call for all Users
Router.get('/', (req, res) => {
	User.find()
		.then(users => {
			res.json(users)
		})
		.catch(error => {
			res.json(error)
		})
})

//Get Call for Single user
Router.get('/:id', (req, res) => {
	const id = req.params.id
	User.findById(id)
		.then(users => {
			res.json(users)
		})
		.catch(error => {
			res.json(error)
		})
})

//Delete Call for Single user
Router.delete('/:id', (req, res) => {
	const id = req.params.id
	User.findByIdAndRemove(id)
		.then(users => {
			res.json(users)
		})
		.catch(error => {
			res.json(error)
		})
})

//Update Single user
Router.put('/:id', (req, res) => {
	const id = req.params.id
	const body = req.body
	User.findByIdAndUpdate(id, {$set: body}, {new: true, runValidators: true})
		.then(user => {
			res.json(user)
		})
		.catch(error => {
			res.json(error)
		})
})

//Post call for user creation
Router.post('/', (req, res) => {
	const body = req.body
	const user = new User(body)
	user.save()
		.then(user => {
			res.json(user)
		})	
		.catch(error => {
			res.json(error)
		})
})

//Login User
Router.post('/login', (req, res) => {
	const body = req.body;

	User.findByCredentails(body.email, body.password)
		.then(user => {
			return user.generateToken()
		})
		.then( token => {
			res.setHeader('x-auth', token).send({})
		})
		.catch(err => {
			res.send(err)
		})
})
// User.findOne({email: body.email})
// 	.then(user => {
// 		if(!user){
// 			res.status('404').send('Invalid Email / Password')
// 		}

// 		bcryptjs.compare(body.password, user.password)
// 		.then(result => {
// 			if(result){
// 				res.send(user)
// 			}else{
// 				res.status('404').send('Invalid Email / Password')
// 			}
// 		})
// 	})
// 	.catch(error => {
// 		res.send(error)
// 	})
module.exports = Router