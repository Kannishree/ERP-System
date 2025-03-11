const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }  // ✅ New supplier field
});

module.exports = mongoose.model('Product', productSchema);
