const bcryptjs = require('bcryptjs')
const password = "secreat12"
const hash = "$2a$10$5ndTva5v6o5oLXSangmJ5.hLZ3QGow4F4mlkohlTAmZI0lIVNrGLK"
bcryptjs.compare(password, hash)
	.then(result => {
		if(result){
			console.log('Compared : password')
		}
		else{
			console.log('Wrong Password')
		}
	})