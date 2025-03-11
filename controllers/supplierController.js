const Supplier = require('../models/supplier'); // Import Supplier model

// ✅ Get all suppliers
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });

        res.json(supplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Add a new supplier
exports.addSupplier = async (req, res) => {
    const supplier = new Supplier({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address
    });

    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Update supplier by ID
exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Ensure the update follows schema rules
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json(updatedSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Delete supplier by ID
exports.deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json({ message: "Supplier deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
