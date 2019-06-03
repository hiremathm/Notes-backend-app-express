const User = require('../models/User')
const authUser = function(req, res, next){
    const token = req.header('x-auth')
	User.findByToken(token)
		.then(function(user) {
            if(user){
                req.user = user
                req.token = token
                next()
            }else{
                res.status('401').send({notice: "Token Not found"})
            }
        })
		.catch(error => {
			res.status('401').send(error)
		})
}

module.exports = authUser;