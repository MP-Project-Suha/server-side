// Models
const userModel = require("../../db/models/user");
const eventModel = require("../../db/models/event");
const ticketModel = require("../../db/models/ticket");

// // delete user ticket
// const deleteMyTicket = (req, res) => {
//     const { _id } = req.params;//ticket id
//     const userId = req.suha._id;

//     userModel
//       .findOne({ _id: userId, isDele: false })
//       .then((user) => {
//         if (user) {
//           ticketModel
//             .findOneAndUpdate({ _id, isDele: false, isVerified:true },{isDele:true},{new:true})
//             .populate("createdBy event")
//             .then((result) => {
//               if (result) {
//                 res.status(200).json(result);
//               } else {
//                 res.status(404).json("There is no ticket for you");
//               }
//             })
//             .catch((err) => {
//               res.status(400).json(err);
//             });
//         } else {
//           res.status(404).json("user dose not exist");
//         }
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   };

// update user ticket
const updateMyTicketByAdmin = (req, res) => {
  const { _id } = req.params; //ticket id
  const userId = req.suha._id;
  const { isVerified, isDele } = req.body;

  if (isVerified) {
    userModel
      .findOne({ _id: userId, isDele: false })
      .then((user) => {
        if (user) {
          ticketModel
            .findOneAndUpdate(
              { _id, isDele: false, isVerified: false },
              { isVerified: true },
              { new: true }
            )
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
  }

  if (isDele) {
    userModel
      .findOne({ _id: userId, isDele: false })
      .then((user) => {
        if (user) {
          ticketModel
            .findOneAndUpdate(
              { _id, isDele: false, isVerified: true },
              { isDele: true },
              { new: true }
            )
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
  }
};
const readTicket = (req, res) => {
  const { _id } = req.params; //ticket id
  const userId = req.suha._id;

  userModel
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
      
          ticketModel.findById(_id).then((result) => {
            if (result) {
              if (result.isDele || result.expired) {
                res.status(404).json("Invalid Ticket");
              } else {
                if (result.isVerified) {
                  ticketModel
                    .findOneAndUpdate(
                      { _id, isDele: false, isUsed: false },
                      { isUsed: true },
                      { new: true }
                    )
                    .populate("createdBy event")
                    .then((ticketresult) => {
                      if (ticketresult) {
                        res.status(200).json("Thank You");
                      } else {
                        res.status(200).json("Thank You");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(400).json(err);
                    });
                } else {
                  res.status(403).json("Unverified Ticket");
                }
              }
            }
          }).catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
        
      } else {
        res.status(404).json("user dose not exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
// update user ticket
const updateMyTicket = (req, res) => {
  const { _id } = req.params; //ticket id
  const userId = req.suha._id;
  const { isVerified, isDele, isUsed } = req.body;

  // const {isVerified, isDele, isUsed}= req.query

  userModel
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
        if (isVerified) {
          ticketModel
            .findOneAndUpdate(
              { _id, isDele: false, isVerified: false, createdBy: user._id },
              { isVerified: true },
              { new: true }
            )
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
        }

        if (isDele) {
          ticketModel
            .findOneAndUpdate(
              { _id, isDele: false, isVerified: true },
              { isDele: true },
              { new: true }
            )
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
        }
        if (isUsed) {
          ticketModel.findById(_id).then((result) => {
            if (result) {
              if (result.isDele || result.expired) {
                res.status(404).json("deleted or expired ticket");
              } else {
                if (result.isVerified) {
                  ticketModel
                    .findOneAndUpdate(
                      { _id, isDele: false, isUsed: false },
                      { isUsed: true },
                      { new: true }
                    )
                    .populate("createdBy event")
                    .then((result) => {
                      if (result) {
                        res.status(200).json("used now");
                      } else {
                        res.status(200).json("used");
                      }
                    })
                    .catch((err) => {
                      res.status(400).json(err);
                    });
                } else {
                  res.status(403).json("unverified ticket");
                }
              }
            }
          });
        }
      } else {
        res.status(404).json("user dose not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// user ticket
const getMyTicket = (req, res) => {
  const { _id } = req.params; //ticket id
  // const userId = req.suha._id;

  // userModel
  //   .findOne({ _id: userId, isDele: false })
  //   .then((user) => {
  //     if (user) {
  ticketModel
    .findOne({ _id, isDele: false, isVerified: true })
    .populate("createdBy event")
    .then((result) => {
      if (result) {
        // const token = result.generateToken(result.event.endAt);
        res.status(200).json({ result });
      } else {
        res.status(404).json("There is no ticket for you");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  //   } else {
  //     res.status(404).json("user dose not exist");
  //   }
  // })
  // .catch((err) => {
  //   res.status(400).json(err);
  // });
};

// user pending ticket
const getMyPendingTicket = (req, res) => {
  const { _id } = req.params; //ticket id
  const userId = req.suha._id;

  userModel
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
        ticketModel
          .findOne({ _id, isDele: false, isVerified: false })
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
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
        ticketModel
          .find({ isDele: false, createdBy: userId, isVerified: true })
          .populate("event")
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
    .findOne({ _id: userId, isDele: false })
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

//create new ticket by admin
const addTicketByAdmin = async (req, res) => {
  try {
    const id = req.suha._id; //user id
    const _id = req.params; //event id
    const newTicket = new ticketModel({
      event: _id,
      createdBy: id,
    });
    newTicket.save();
    const event = await eventModel.findById(_id);
    event.tickets.push(newTicket);
    await event.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//create new ticket
const addMyTicket = async (req, res) => {
  try {
    const id = req.suha._id; //user id
    const _id = req.params; //event id
    userModel
      .findOne({ _id: id, isDele: false })
      .then(async (result) => {
        if (result) {
          const result = await ticketModel.find({
            event: _id,
            isVerified: true,
          });

          if (result.length <= 1) {
            const newTicket = new ticketModel({
              event: _id,
              createdBy: id,
              isVerified: true,
            });
            newTicket.save();

            const event = await eventModel.findById(_id);
            event.tickets.push(newTicket);
            await event.save();
            const token = newTicket.generateToken(event.endAt);
            res.status(201).json({ newTicket, token });
          } else {
            res.status(403).json("you can not add more ticket");
          }
        } else {
          res.status(404).json("not found user");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//guest list
const guestList = async (req, res) => {
  try {
    const id = req.suha._id; //user id
    const _id = req.params; //event id
    const { guests } = req.body; //array of objects {email:"", firstName:"", lastName:""}
    const checkSuccess = [];

    const eventExist = await eventModel.findOne({
      $and: [{ _id: _id }, { createdBy: id }, { isVerified: true }],
    });

    if (eventExist) {
      for (let i = 0; i < guests.length; i++) {
        const user = await userModel.findOne({
          email: guests[i].email.toLowerCase(),
        });

        if (user) {
          const existTicket = await ticketModel.findOne({
            $and: [{ event: _id }, { createdBy: user._id }],
          });
          if (existTicket) {
            const pendingTicket = await ticketModel.findOneAndUpdate(
              {
                $and: [
                  { event: _id },
                  { createdBy: user._id },
                  { isVerified: false },
                ],
              },
              { isVerified: true },
              { new: true }
            );
            if (pendingTicket) checkSuccess.push(pendingTicket);
            else checkSuccess.push(existTicket);
          } else {
            const newTicket = await new ticketModel({
              event: _id,
              createdBy: user._id,
              isVerified: true,
            });
            await newTicket.save();
            checkSuccess.push(newTicket);
            const event = await eventModel.findById(_id);
            event.tickets.push(newTicket);
            await event.save();
          }

          // here send mail
        } else {
          //create new user
          let password = guests[i].email + process.env.secret_key;
          const newUser = await new userModel({
            firstName: guests[i].firstName,
            lastName: guests[i].lastName,
            password,
            email: guests[i].email.toLowerCase(),
            role: process.env.USER_ROLE,
          });
          newUser.save();

          const newTicket = await new ticketModel({
            event: _id,
            createdBy: newUser._id,
            isVerified: true,
          });
          await newTicket.save();
          checkSuccess.push(newTicket);
          const event = await eventModel.findOne({ _id });
          event.tickets.push(newTicket);
          await event.save();
        }
      }
      res.status(201).json(checkSuccess);
    } else {
      res.status(404).json("no such a event for you");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  getMyTickets,
  getMyTicket,
  getMyPendingTicket,
  getMyPendingTickets,
  updateMyTicket,
  addMyTicket,
  addTicketByAdmin,
  updateMyTicketByAdmin,
  guestList,
  readTicket,
};
