const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 5
	},
	dob: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	}, 
	age: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(value){
				return validator.isEmail(value)
			},
			message: function(){
				return "Invalid Email Format"
			}
		}
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 6,
		maxlength: 128
	},
	tokens: [
		{
			token: {
				type: String
			},
			createdAt: {
				type: Date,
				default: Date.now
			}
		}
	]
}) 

//Pre Hook
userSchema.pre('save', function(next){
	const user = this;
	if(user.isNew){
		bcryptjs.genSalt(10)
		.then(salt => {
			bcryptjs.hash(user.password, salt)
				.then(function(encryptedPassword){
					user.password = encryptedPassword;
					next()
				})
		})
	}else{
		next()
	}
})

userSchema.statics.findByCredentails = function(email, password){
	const User = this
	return User.findOne({email})
				.then(user => {
					if(!user){
						return Promise.reject("Invalid Email / Password")
					}

					return bcryptjs.compare(password, user.password)
								.then(result => {
									if(result){
										return Promise.resolve(user)
										// return new Promise(function(resolve, reject){
											// resolve(user)
										// }))
									}else {
										return Promise.reject("Invalid Email / Password")
									}
								})
				})
				.catch(error => {
					return Promise.reject(error)
				})
}

userSchema.statics.findByToken = function(token) {
	const User = this
	let tokenData 
	try {
		tokenData = jwt.verify(token, 'shiva@123')
	}catch(error) {
		return Promise.reject(error)
	}

	return User.findOne({
		"_id": tokenData._id,
		"tokens.token" : token
	})
}

//Own instance method
userSchema.methods.generateToken = function(){
	const user = this
	const tokenData = {
		_id: user._id,
		name: user.name,
		createdAt: Number(new Date())
	}
	const token = jwt.sign(tokenData, 'shiva@123')
	user.tokens.push({token})
	return user.save()
		.then(user => {
			return Promise.resolve(token)
		})
		.catch(error => {
			return Promise.reject(error)
		})
}

const User = mongoose.model('User', userSchema)

module.exports = User;