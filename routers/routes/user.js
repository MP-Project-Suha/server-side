const express = require("express");
const userRouter = express.Router();

// authentication middle wear
const authentication = require("../auth/authentication");
// authentication middle wear
const authorization = require("../auth/authorization");

// Destructuring controllers
const { register , verify, login, googleLogin, forgetPassword, resetPassword} = require("../controllers/user");

// Register route and verify account route
userRouter.post("/register", register);
userRouter.get("/verify/:token", verify);

// Login route
userRouter.post("/login", login);
// Google login 
userRouter.post("/googleLogin", googleLogin);

// For reset password routes
userRouter.post("/forgotPassword", forgetPassword);
userRouter.post("/resetPassword/:_id/:token", resetPassword);

module.exports = userRouter;
