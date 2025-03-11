const Order = require("../models/order");
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const generateInvoice = require("../utils/invoiceGenerator");

// 📌 Place a New Order
exports.placeOrder = async (req, res) => {
    try {
        const { productID, customerName, quantity } = req.body;

        const product = await Product.findById(productID);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" });

        const totalPrice = product.price * quantity;

        const newOrder = new Order({
            orderID: uuidv4(),
            productID,
            customerName,
            quantity,
            totalPrice,
            status: "Pending"
        });

        product.stock -= quantity;
        await product.save();
        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("productID");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Generate Invoice for an Order
exports.getInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("productID");
        if (!order) return res.status(404).json({ message: "Order not found" });

        generateInvoice(order, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
