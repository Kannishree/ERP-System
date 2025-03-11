const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // Customer Name
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Linked Product
    quantity: { type: Number, required: true }, // Ordered Quantity
    status: { type: String, enum: ["Pending", "Processed", "Shipped", "Delivered", "Canceled"], default: "Pending" },
    totalPrice: { type: Number, required: true }, // Total Order Price
    orderDate: { type: Date, default: Date.now }, // Order Date
});

module.exports = mongoose.model("Order", OrderSchema);
