const mongoose = require('mongoose')

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('koneksi ke mongodb berhasil')
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = conn