const PDFDocument = require("pdfkit");

function generateInvoice(order, res) {
    const doc = new PDFDocument();

    res.setHeader("Content-Disposition", `attachment; filename=invoice_${order._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(22).text("SmartERP - Invoice", { align: "center" });
    doc.moveDown();
    
    doc.fontSize(14).text(`Invoice ID: ${order.orderID}`);
    doc.text(`Customer Name: ${order.customerName}`);
    doc.text(`Product: ${order.productID.name}`);
    doc.text(`Quantity: ${order.quantity}`);
    doc.text(`Total Price: $${order.totalPrice}`);
    doc.text(`Order Date: ${order.createdAt.toDateString()}`);
    doc.text(`Status: ${order.status}`);
    
    doc.moveDown();
    doc.text("Thank you for your purchase!", { align: "center" });

    doc.end();
}

module.exports = generateInvoice;
