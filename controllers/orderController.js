const Order = require("../models/order");
const Product = require("../models/product");
const InvoiceGenerator = require("../utils/invoiceGenerator");
const path = require("path");

// ✅ Create an order and generate an invoice
exports.createOrder = async (req, res) => {
  const { customerName, productId, quantity, totalPrice } = req.body;

  if (quantity <= 0 || totalPrice <= 0) {
    return res.status(400).json({ message: "Quantity and total price must be greater than zero" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Reduce stock
    product.stock -= quantity;
    await product.save();

    // Create order
    const order = new Order({ 
      customerName, 
      productId, 
      quantity, 
      totalPrice, 
      status: "Pending" 
    });
    await order.save();

    // Generate Invoice
    const invoicePath = await InvoiceGenerator.generateInvoice(order);

    res.status(201).json({ message: "Order placed successfully", order, invoice: invoicePath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
