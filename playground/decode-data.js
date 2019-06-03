const jwt = require('jsonwebtoken')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2YzMmNiZmM0ZDQ5MTUxMjI4ZDdmOGMiLCJuYW1lIjoic2hpdmExIiwiY3JlYXRlZEF0IjoxNTU5NDcwMDQ2ODQxLCJpYXQiOjE1NTk0NzAwNDZ9.KI1TVuHUIjlDSiW6lLLKmq_nbCOMagRuyE-b6GWrDR0"

console.log(jwt.verify(token, 'shiva@123'))