require('dotenv').config()
const conn = require('./databases/db.js')
conn()

const express = require('express')
const server = express()

server.use(express.json())

const authRouter = require('./routes/auth-router.js')
const homeRouter = require('./routes/home-router.js')
const adminRouter = require('./routes/admin-router.js')
const ImageRouter = require('./routes/image-router.js')
server.use('/auth', authRouter)
server.use('/home', homeRouter)
server.use('/admin', adminRouter)
server.use('/upload', ImageRouter)

const PORT = process.env.PORT
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))

// "username":"user test final",
//   "email":"utf@gmail.com",
//   "password":"12345678",
//   "role":"admin"