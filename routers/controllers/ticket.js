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

// update user ticket
const updateMyTicket = (req, res) => {
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

// user ticket
const getMyTicket = (req, res) => {
  const { _id } = req.params; //ticket id
  const userId = req.suha._id;

  userModel
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
        ticketModel
          .findOne({ _id, isDele: false, isVerified: true })
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
    .findOne({ _id: userId, isDele: true, isVerified: false })
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
const addTicketByAdmin = (req, res) => {
  try {
    const id = req.suha._id; //user id
    const _id = req.params; //event id
    const newTicket = new ticketModel({
      event: _id,
      createdBy: id,
    });

    newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//create new ticket
const addMyTicket = (req, res) => {
  try {
    const id = req.suha._id; //user id
    const _id = req.params; //event id
    userModel
      .findOne({ _id: id, isDele: false })
      .then((result) => {
        if (result) {
          const newTicket = new ticketModel({
            event: _id,
            createdBy: id,
          });
          newTicket.save();

          res.status(201).json(newTicket);
        } else {
          res.status(404).json("not found user");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//guest list
const guestList = async (req, res) => {
  let checkErrors = [];
  let checkSuccess = [];

  try {
    // const id = req.suha._id; //user id
    const _id = req.params; //event id
    const { guests } = req.body;
    let count = 0;

    // const guests = [
    //   {
    //     email: "SuhaalHumaid@hotmail.com",
    //     firstName: "Suha",
    //     lastName: "Saleh",
    //   },
    //   { email: "fras7a@hotmail.com", firstName: "Sara", lastName: "Salem" },
    //   {
    //     email: "SuhaalHumaid@gmail.com",
    //     firstName: "Nourah",
    //     lastName: "Saleh",
    //   },
    //   { email: "fras7a@gmail.com", firstName: "Haifa", lastName: "Saleh" },
    // ];
for(let i=0 ;i<guests.length;i++){
    // guests.forEach((guest) => { 
      userModel
        .findOne({ email: guests[i].email.toLowerCase() })
        .exec(async (err, user) => {
          if (err) {
            checkErrors.push(err);
          }
          if (user) {
            //user id
            const newTicket = await new ticketModel({
              event: _id,
              createdBy: user._id,
            });
            await newTicket.save((err, data) => {
              if (err) {
                checkErrors.push(err);
              }
              checkSuccess.push(data);
              console.log(checkSuccess);
            });

            // here send mail
          } else {
          
            //create new user
            let password = guests[i].email + process.env.secret_key;
            // const SALT = Number(process.env.SALT);
            // const hashedPass = await bcrypt.hash(password, SALT);
            const newUser = await new userModel({
              firstName: guests[i].firstName,
              lastName: guests[i].lastName,
              password,
              email: guests[i].email.toLowerCase(),
              role: process.env.USER_ROLE,
            });
            await newUser.save(async (err, data) => {
              if (err) {
                checkErrors.push(err);
              }

              const newTicket = await new ticketModel({
                event: _id,
                createdBy: data._id,
              });
              await newTicket.save((err, data) => {
                if (err) {
                  checkErrors.push(err);
                }
                checkSuccess.push(data);
              });

              // checkSuccess.push(newTicket);
              // here send mail
            });
          }
        }
       
        );
      }
console.log(checkSuccess);
      res.status(200).json(checkSuccess);


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
};
