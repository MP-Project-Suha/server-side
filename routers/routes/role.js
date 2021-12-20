const express = require("express");
const roleRouter = express.Router();

//destructuring
const { createRole, getAllRoles } = require("../controllers/role");

// authentication middelle wear
const authentication = require("../auth/authentication");
// authentication middelle wear
const authorization = require("../auth/authorization");

//controllers:

//create a role by admin
roleRouter.post("/role", createRole);
//get roles data by admin
roleRouter.get("/roles", getAllRoles);

module.exports = roleRouter;
