// Models
const userModel = require("../../db/models/user");
const eventModel = require("../../db/models/event");
const ticketModel = require("../../db/models/ticket");

//create new event
const addEvent = (req, res) => {
  try {
    const id = req.suha._id; //user id
    const {
      title,
      shortDisc,
      longDisc,
      images,
      location,
      price,
      beginAt,
      endAt,
      isPublic
    } = req.body;
    userModel
      .findOne({_id: id, isDele: false})
      .then((result) => {
         
        if (result) {
        
            const newEvent = new eventModel({
              title,
              shortDisc,
              longDisc,
              images,
              location,
              price,
              beginAt,
              endAt,
              isPublic,
              createdBy: result._id,
            });
            
            newEvent.save()
            res.status(201).json(newEvent);
          }else {
            res.status(404).json("not found user");
          }
        
        
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
  }
};

// user event
const getMyEvent = (req, res) => {
  const { _id } = req.params;
  const userId = req.suha._id;

  userModel
    .findOne({ _id: userId, isDele: true })
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

// public event
const getEvent = (req, res) => {
  const { _id } = req.params; //event
  eventModel
    .findOne({ _id, isDele: false , isPublic: true})
    .populate("createdBy")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("no events");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
//get all events of user
const getMyEvents = (req, res) => {
  const userId = req.suha._id;
  userModel
    .findOne({ _id: userId, isDele: true })
    .then((user) => {
      if (user) {
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
      } else {
        res.status(404).json("user dose not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//get all public event
const allEvents = (req, res) => {
  eventModel
    .find({ isDele: false, isPublic: true })
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

//delete my event
const deleteMyEvent = (req, res) => {
  const userId = req.suha._id;
  const { _id } = req.params;
  userModel
    .findOne({ _id: userId, isDele: false })
    .then((user) => {
      if (user) {
        eventModel
          .findOneAndUpdate(
            { _id, isDele: false },
            { isDele: true },
            { new: true }
          )
          .then((result) => {
            if (result) {
              ticketModel
                .updateMany(
                  {
                    $or: [
                      { createdBy: _id, isDele: false },
                      { event: result._id, isDele: false },
                    ],
                  },
                  { isDele: true },
                  { new: true }
                )
                .then((result) => {
                  if (result) {
                    res.status(201).json(result);
                  }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                  });
            } else {
              res.status(404).json("There is no event for you");
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      } else {
        res.status(404).json("user dose not exist");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

//update my event
const updateMyEvent = (req, res) => {
    const userId = req.suha._id; //user
    const { _id } = req.params; //event
    const {  
        title,
        shortDisc,
        longDisc,
        images,
        location,
        price,
        beginAt,
        endAt,
        isPublic
    } = req.body;

     userModel .findOne({ _id: userId, isDele: false })
      .then((user) => {
        if (user) {
            if ( title){          eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  { title },
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });
                    }
            if (shortDisc){
                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {shortDisc },
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (longDisc){
                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {longDisc },
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (images){
                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {images },
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (location){

                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {location},
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (price){

                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {price},
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (beginAt){

                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {beginAt},
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (endAt){

                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {endAt},
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }
            if (isPublic){

                eventModel
                .findOneAndUpdate(
                  { _id, isDele: false },
                  {isPublic},
                  { new: true }
                )
                      .then((result) => {
                        if (result) {
                          res.status(201).json(result);
                        } else {
                            res.status(404).json("There is no event for you");
                          }
                      })
                      .catch((err) => {
                          console.log(err);
                          res.status(400).json(err);
                        });

            }

           
        } else {
          res.status(404).json("user dose not exist");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  };

module.exports = {
  addEvent,
  getEvent,
  deleteMyEvent,
  allEvents,
  getMyEvents,
  getMyEvent,
  updateMyEvent
};
