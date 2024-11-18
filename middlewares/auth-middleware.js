// middleware/authMiddleware.js
const jwt = require('jsonwebtoken')
const User = require('../models/user-model.js')

// Secret key untuk JWT (harus disimpan dengan aman, bisa diambil dari environment variable)
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' })
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded  // Menyimpan data decoded ke req.user untuk digunakan di route lain
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Token tidak valid' })
  }
}

const isAdmin = async(req, res, next) => {
  const token = req.header('Authorization') 
  const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
  const role = decoded.role
  
  if (role == 'admin') {
    return res.status(403).json({ message: 'Akses ditolak: hanya admin yang bisa mengakses halaman ini' });
  }
  next()
}

module.exports = { verifyToken, isAdmin }