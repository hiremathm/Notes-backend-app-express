const jwt = require('jsonwebtoken')

const tokenData = {
    name: "Shivakumara M",
    age: "25",
    phone: "9731937369"
}

const encryptedData = jwt.sign(tokenData, "shiva@123");
console.log(encryptedData)
