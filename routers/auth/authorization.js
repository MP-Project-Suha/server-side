const roleModel = require("../../db/models/role");
require("dotenv").config();

//if it's admin or not
const authorization = async (req, res, next) => {
  try {
    //get token if role is admin then next
    const roleID = req.suha.role;

    const result = await roleModel.findById(roleID);
    if (result._id == process.env.ADMIN_ROLE) {
      next();
    } else {
      res.status(403).json("forbidden");
    }
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = authorization;
