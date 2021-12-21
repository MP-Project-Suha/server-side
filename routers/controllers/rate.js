// Models
const userModel = require("../../db/models/user");
const eventModel = require("../../db/models/event");
const ticketModel = require("../../db/models/ticket");
const rateModel = require("../../db/models/rate");

//create new event
const addRate = (req, res) => {
  try {
    const id = req.suha._id; // user id
    const { _id } = req.params; // event
    const { rate } = req.body;

    userModel
      .findOne({ _id: id, isDele: false })
      .then((user) => {
        if (user) {
          eventModel
            .findOne({ _id, isDele: false })
            .then((result) => {
              if (result) {
                rateModel.findOne({
                    event:result._id,
                    createdBy:_id
                }).then((result)=>{
                    if(result){
                        res.status(400).json("you already rated");
                    }else{

                        const newRate = new rateModel({
                            rate,
                            event:result._id,
                            createdBy:_id
                          });
                          newRate.save();
                          res.status(201).json(newRate);

                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json(error);
                  });

    
              } else {
                res.status(404).json("not found event");
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json(error);
            });
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
// public event
const getRates = (req, res) => {
  const { _id } = req.params; //event

  rateModel
    .find({ event: _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = { addRate, getRates };
