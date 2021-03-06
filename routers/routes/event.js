const express = require("express");
const eventRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const {
  addEvent,
  getMyEvents,
  getMyEvent,
  getEvent,
  allEvents,
  deleteMyEvent,
  updateMyEvent,
  controlEvents,
  controlEvent,
  getMyEventTickets
} = require("../controllers/event");

//public event
eventRouter.get("/event/:_id", getEvent);
eventRouter.get("/events", allEvents);

// crud on event of user
eventRouter.get("/myEvent/:_id",authentication, getMyEvent);
eventRouter.get("/myEventTickets/:_id",authentication, getMyEventTickets);
eventRouter.get("/myEvents",authentication, getMyEvents);



eventRouter.post("/myEvent",authentication, addEvent);
eventRouter.delete("/myEvent/:_id",authentication, deleteMyEvent);
eventRouter.put("/myEvent/:_id",authentication, updateMyEvent);


eventRouter.get("/controlEvents",authentication,authorization, controlEvents);
eventRouter.delete("/controlEvent/:_id",authentication,authorization, controlEvent);
module.exports = eventRouter;
