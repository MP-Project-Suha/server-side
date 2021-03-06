const express = require("express");
const rateRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// // authentication middle wear
// const authorization = require("../auth/authorization");

// Destructuring controllers
const {
    addRate,
    getRates
} = require("../controllers/rate");

// new rate
rateRouter.post("/rate/:_id",authentication, addRate);
// get rate
rateRouter.get("/rates/:_id", getRates);

module.exports = rateRouter;
