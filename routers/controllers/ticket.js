


// Models
const userModel = require("../../db/models/user");
const eventModel = require("../../db/models/event");
const ticketModel = require("../../db/models/ticket");


// user ticket
const getMyTicket = (req, res) => {
  const { _id } = req.params;//ticket id
  const userId = req.suha._id;

  userModel
    .findOne({ _id: userId, isDele: true })
    .then((user) => {
      if (user) {
        ticketModel
          .findOne({ _id, isDele: false, isVerified:true })
          .populate("createdBy event")
          .then((result) => {
            if (result) {
              res.status(200).json(result);
            } else {
              res.status(404).json("There is no ticket for you");
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


// user pending ticket
const getMyPendingTicket = (req, res) => {
    const { _id } = req.params;//ticket id
    const userId = req.suha._id;
  
    userModel
      .findOne({ _id: userId, isDele: true })
      .then((user) => {
        if (user) {
          ticketModel
            .findOne({ _id, isDele: false, isVerified:false })
            .populate("createdBy event")
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).json("There is no ticket for you");
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

//get all tickets of user
const getMyTickets = (req, res) => {
  const userId = req.suha._id;
  userModel
    .findOne({ _id: userId, isDele: true ,isVerified:false})
    .then((user) => {
      if (user) {
        ticketModel
          .find({ isDele: false })
          .populate("createdBy event")
          .then((result) => {
            if (result) {
              res.status(201).json(result);
            } else {
              res.status(404).json("There is no ticket to show");
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

//get all  pending tickets of user
const getMyPendingTickets = (req, res) => {
    const userId = req.suha._id;
    userModel
      .findOne({ _id: userId, isDele: true ,isVerified:true})
      .then((user) => {
        if (user) {
          ticketModel
            .find({ isDele: false })
            .populate("createdBy event")
            .then((result) => {
              if (result) {
                res.status(201).json(result);
              } else {
                res.status(404).json("There is no tickets to show");
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
  





module.exports = {
getMyTickets,
getMyTicket,
getMyPendingTicket,
getMyPendingTickets,
};
