const express = require('express')
const { verifyToken, isAdmin } = require('../middlewares/auth-middleware')
const route = express.Router()

route.get('/pages', isAdmin, verifyToken, (req, res) => res.send('admin pages '))

module.exports = route