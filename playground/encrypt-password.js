const bcryptjs = require('bcryptjs')
const password = "secreat123"

bcryptjs.genSalt(10)
	.then(salt => {
		bcryptjs.hash(password, salt)
			.then(function(encryptedPassword){
				console.log(encryptedPassword)
			})
	})