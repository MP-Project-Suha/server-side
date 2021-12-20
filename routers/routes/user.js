const express = require("express");
const userRouter = express.Router();

// authentication middelle wear
const authentication = require("../auth/authentication");
// authentication middelle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const { register , verify, login} = require("../controllers/user");

//register route and verfy account route
userRouter.post("/register", register);
userRouter.get("/verify/:token", verify);

//login route
userRouter.post("/login", login);

module.exports = userRouter;
