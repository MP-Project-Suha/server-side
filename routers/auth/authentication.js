const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  try {
    //case: token isn't exist
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }
    //case: token exist
    const token = req.headers.authorization.split(" ")[1];
    // verify token then set it as key in request header object
    if(token){
    const parsedToken = jwt.verify(token, process.env.secret_key);
    req.suha = parsedToken;
    next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};

module.exports = authentication;
