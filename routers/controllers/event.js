// Models
const userModel = require("../../db/models/user");
const eventModel = require("../../db/models/event");
const ticketModel = require("../../db/models/ticket");

//create new event
const addEvent = (req, res) => {
    try {

    const id = req.suha._id; //user id
    const { title,shortDisc,longDisc, images,location,price,beginAt,endAt} = req.body;
    userModel
      .findById(id)
      .then((result) => {
        if (result) {
          if (result.isDele == false) {
            const newEvent = new eventModel({
                title,shortDisc,longDisc, images,location,price,beginAt,endAt,
                createdBy: result._id,
            });
  
            newEvent.save();
            res.status(201).json(newEvent);
          }
        }
        res.status(404).json("not found user");
      })
      .catch((err) => {
        res.status(400).json(err);
      })
              
    } catch (error) {
        console.log(error);
    }
  };

  module.exports = {
    addEvent,

  };