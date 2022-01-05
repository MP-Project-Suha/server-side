const express = require("express");
const paymentRouter = express.Router();

const { payment } = require("../controllers/payment");


// Payment method
paymentRouter.post("/create-payment-intent", payment);

module.exports = paymentRouter;












