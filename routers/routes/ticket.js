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
  getMyPendingTicket,
  updateMyTicket,
  addMyTicket,
  addTicketByAdmin,
  updateMyTicketByAdmin,
  guestList
} = require("../controllers/ticket");

// ticket for user
ticketRouter.get("/myTickets", authentication, getMyTickets);
ticketRouter.get("/myTicket/:_id", authentication, getMyTicket);
ticketRouter.post("/guestList/:_id", authentication,  guestList);
// pending ticket for user
ticketRouter.get("/myPendingTickets", authentication, getMyPendingTickets);
ticketRouter.get("/myPendingTicket/:_id", authentication, getMyPendingTicket);

ticketRouter.post("/myTicket/:_id", authentication, addMyTicket);
ticketRouter.put("/myTicket/:_id", authentication, updateMyTicket);

ticketRouter.post(
  "/controlTicket/:_id",
  authentication,
  authorization,
  addTicketByAdmin
);
ticketRouter.put(
  "/controlTicket/:_id",
  authentication,
  authorization,
  updateMyTicketByAdmin
);
module.exports = ticketRouter;


