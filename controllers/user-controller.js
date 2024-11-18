const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model.js')

const register = async (req, res) => {

    let {
        username,
        email,
        password,
        role
    } = req.body


    try {
        password = password.split('')
        if (password.length < 8) {
            res.status(400).json({
                success: false,
                message: 'password minimal 8 karakter atau lebih'
            })

        }
        else {
            password = password.join('')
            const existUser = await User.findOne({
                $or: [
                    { username: username },
                    { email: email },
                ]
            })

            if (existUser) {
                res.status(400).json({
                    success: false,
                    message: 'Username atau email sudah terdaftar'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                username,
                email,
                password: hashPassword,
                role
            })
            await newUser.save()

            res.status(201).json({
                success: true,
                message: 'success register user',
                data: newUser
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}


const login = async (req, res) => {
    let {
        username,
        password
    } = req.body

    const JWT = process.env.JWT_SECRET
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            res.status(404).json({ message: 'user tidak ditemukan' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(404).json({ message: 'password salah, invalid credentials!' })
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, JWT, { expiresIn: '15m' })

        res.status(200).json({
            success: true,
            message: 'berhasil login user',
            token,
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
}

module.exports = { register, login }