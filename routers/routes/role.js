const express = require("express");
const roleRouter = express.Router();

//destructuring
const { createRole, getAllRoles } = require("../controllers/role");

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

//controllers:

//create a role by admin
roleRouter.post("/role", authentication, authorization, createRole);
//get roles data by admin
roleRouter.get("/roles", authentication, authorization, getAllRoles);

module.exports = roleRouter;
