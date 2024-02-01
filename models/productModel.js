const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
},{ timestamps: true })

const product = mongoose.model('product', ProductSchema)

module.exports = product