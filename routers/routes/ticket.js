const express = require("express");
const ticketRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const {
    getMyTickets,
    getMyTicket,
    getMyPendingTickets,
    getMyPendingTicket
} = require("../controllers/ticket");



//get ticket for user 
ticketRouter.get("/myTickets",authentication, getMyTickets);
ticketRouter.get("/myTicket",authentication, getMyTicket);
ticketRouter.get("/myPendingTickets",authentication, getMyPendingTickets);
ticketRouter.get("/myPendingTicket/:_id",authentication, getMyPendingTicket);

module.exports = ticketRouter;
