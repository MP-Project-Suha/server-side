// Models
const userModel = require("../../db/models/user");
const orderModel = require("../../db/models/order");

//create new order
const addOrder = (req, res) => {
  try {
    const id = req.suha._id; // user id
    const { tickets ,total } = req.body;

    userModel
      .findOne({ _id: id, isDele: false })
      .then((user) => {
        if (user) {

                        const newOrder= new orderModel({
                            tickets ,total,
                            createdBy:user._id
                          });
                          newOrder.save();
                          res.status(201).json(newOrder);
     
        } else {
          res.status(404).json("not found user");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  } catch (error) {
    console.log(error);
  }
};

// get order 
const getOrder = (req, res) => {
  const { _id } = req.params; //order
  orderModel
    .findOne({_id: _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { addOrder, getOrder};
