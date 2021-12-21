const express = require("express");
const eventRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const {
  addEvent,

} = require("../controllers/event");

// Add new event 
eventRouter.post("/myEvent",authentication, addEvent);


module.exports = eventRouter;
