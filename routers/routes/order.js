

const express = require("express");
const orderRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// // authentication middle wear
// const authorization = require("../auth/authorization");

// Destructuring controllers
const {
    addOrder, getOrder
} = require("../controllers/order");

// new order 
orderRouter.post("/order",authentication, addOrder);
// get order
orderRouter.get("/order/:_id",authentication, getOrder);

module.exports = orderRouter;
