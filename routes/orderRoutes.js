const express = require("express");
const orderController = require("../controllers/orderRoutesController");

const router = express.Router();

router.post("/place", orderController.placeOrder);  // ✅ Place an order
router.get("/all", orderController.getAllOrders);  // ✅ Get all orders
router.get("/invoice/:id", orderController.getInvoice);  // ✅ Download Invoice

module.exports = router;
