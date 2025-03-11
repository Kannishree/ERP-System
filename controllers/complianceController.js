const Compliance = require("../models/compliance");
const moment = require("moment");

// ✅ Add a new transaction with tax calculation
exports.addTransaction = async (req, res) => {
    try {
        const { transactionId, amount, taxRate, remarks } = req.body;
        const taxAmount = (amount * taxRate) / 100;
        const totalAmount = amount + taxAmount;

        const newEntry = new Compliance({
            transactionId,
            amount,
            taxRate,
            taxAmount,
            totalAmount,
            remarks
        });

        await newEntry.save();
        res.status(201).json({ message: "Transaction recorded successfully", newEntry });
    } catch (error) {
        res.status(500).json({ error: "Error adding transaction" });
    }
};

// ✅ Generate Monthly Tax Report
exports.generateReport = async (req, res) => {
    try {
        const { year, month } = req.params;
        const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
        const endDate = moment(startDate).endOf("month").toDate();

        const report = await Compliance.find({
            date: { $gte: startDate, $lte: endDate }
        });

        let totalTax = report.reduce((sum, entry) => sum + entry.taxAmount, 0);
        let totalRevenue = report.reduce((sum, entry) => sum + entry.totalAmount, 0);

        res.json({
            month: moment(startDate).format("MMMM YYYY"),
            totalRevenue,
            totalTax,
            transactions: report
        });
    } catch (error) {
        res.status(500).json({ error: "Error generating report" });
    }
};

// ✅ Get All Transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const records = await Compliance.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "Error fetching records" });
    }
};
