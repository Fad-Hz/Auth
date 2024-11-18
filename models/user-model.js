const mongoose = require('mongoose')

// Mendefinisikan skema User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username harus diisi'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minlength: [8, 'Password minimal 8 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })

// Membuat model User berdasarkan schema
const User = mongoose.model('User', userSchema)

module.exports = User