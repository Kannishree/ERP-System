const mongoose = require("mongoose");

const ComplianceSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    taxRate: { type: Number, required: true }, // GST/VAT %
    taxAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    remarks: { type: String }
});

module.exports = mongoose.model("Compliance", ComplianceSchema);
