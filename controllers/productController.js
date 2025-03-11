const mongoose = require('mongoose');
const Product = require('../models/product'); // Import Product model

// ✅ Create a product with supplier validation
exports.createProduct = async (req, res) => {
    const { name, price, stock, supplier } = req.body;

    if (!supplier) {
        return res.status(400).json({ message: 'Supplier ID is required' });
    }

    try {
        // Convert supplier to ObjectId
        const supplierObjectId = new mongoose.Types.ObjectId(supplier);

        const product = new Product({ name, price, stock, supplier: supplierObjectId });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// ✅ Get all products with pagination, search, and supplier details
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const products = await Product.find(query)
            .populate('supplier', 'name contact email address') // ✅ Fetch supplier details
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

        res.json(products);
    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// ✅ Get a single product by ID with supplier details
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier', 'name contact email address');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        console.error("Get Product By ID Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// ✅ Update a product with supplier validation
exports.updateProduct = async (req, res) => {
    const { name, price, stock, supplier } = req.body;

    if (!supplier) {
        return res.status(400).json({ message: 'Supplier ID is required' });
    }

    try {
        console.log(`Updating product ID: ${req.params.id} to supplier: ${supplier}`);
        
        // Convert supplier to ObjectId
        const supplierObjectId = new mongoose.Types.ObjectId(supplier);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, stock, supplier: supplierObjectId },
            { new: true, runValidators: true }
        ).populate('supplier', 'name contact email address'); // ✅ Populate supplier after update

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log("Updated Product:", updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: error.message });
    }
};

// ✅ DELETE: Only allow deletion if stock is 0
// ✅ DELETE: Now allows deletion regardless of stock value
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log("Deleting Product:", product); // ✅ Log product details

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: error.message });
    }
};



