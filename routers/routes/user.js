const express = require("express");
const userRouter = express.Router();

// authentication middelle wear
const authentication = require("../auth/authentication");
// authentication middelle wear
const authorization = require("../auth/authorization");


// Destructuring controllers
const {
    register,
  } = require("../controllers/user");
  

  
  //register route
  userRouter.post("/register", register);

  
  module.exports = userRouter;