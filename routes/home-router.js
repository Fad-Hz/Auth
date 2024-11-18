const express = require('express')
const { verifyToken } = require('../middlewares/auth-middleware')
const route = express.Router()

route.get('/welcome', verifyToken, (req, res) => res.send('home page'))

module.exports = route