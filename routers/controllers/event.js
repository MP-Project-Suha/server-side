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

  const getEvent = (req, res) => {
    const { _id } = req.params;
    const userId = req.suha._id;
  
    userModel
      .findOne({ _id: userId ,isDele:true})
      .then((user) => {
        if (user) {
    
            eventModel
              .findOne({ _id, isDele: false })
              .populate("createdBy")
              .then((result) => {
                if (result) {
                  res.status(200).json(result);
                } else {
                  res.status(404).json("There is no event for you");
                }
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          
        } else {
          res.status(404).json("user dose not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  //get all event (not deleted)
const allEvents = (req, res) => {
    eventModel
      .find({ isDele: false })
      .populate("createdBy")
      .then((result) => {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(404).json("There is no events to show");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  module.exports = {
    addEvent,
    getEvent,
    allEvents,

  };