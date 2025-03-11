const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/sales', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const matchStage = {};
    if (startDate && endDate) {
      matchStage.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const totalSales = await Order.aggregate([
      { $match: matchStage },
      { $group: { _id: null, total: { $sum: '$totalPrice' }, totalOrders: { $sum: 1 } } }
    ]);

    res.json({
      totalOrders: totalSales[0]?.totalOrders || 0,
      totalRevenue: totalSales[0]?.total || 0
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
const reportRoutes = require('./routes/report');
app.use('/api/reports', reportRoutes);
