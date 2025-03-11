const express = require("express");
const supplierController = require("../controllers/supplierController");

const router = express.Router();

router.get("/", supplierController.getSuppliers);
router.get("/:id", supplierController.getSupplierById);  // ✅ Added this route
router.post("/", supplierController.addSupplier);
router.put("/:id", supplierController.updateSupplier);
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
