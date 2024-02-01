const mongoose = require('mongoose')

const VariantSchema = mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    additional_cost: { type: Number, required: true },
    stock_count: { type: Number, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },

},{
    timestamps:true
})

const variant = mongoose.model('variant', VariantSchema)

module.exports = variant