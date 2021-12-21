const express = require("express");
const eventRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const {
  addEvent,
  getEvent,
  allEvents,
} = require("../controllers/event");

// Add new event 
eventRouter.post("/myEvent",authentication, addEvent);
eventRouter.get("/myEvent/:_id",authentication, getEvent);
eventRouter.get("/myEvents",authentication, allEvents);

module.exports = eventRouter;
