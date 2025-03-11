const express = require("express");
const router = express.Router();
const complianceController = require("../controllers/complianceController");

router.post("/add", complianceController.addTransaction);
router.get("/report/:year/:month", complianceController.generateReport);
router.get("/all", complianceController.getAllTransactions);

module.exports = router;
