const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ticketSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },

    isDele: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    expired: { type: Boolean, default: false, required: true },
    isUsed: { type: Boolean, default: false, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

ticketSchema.methods.generateToken = function (date) {
  const ticket = this;

  const token = jwt.sign(
    { _id: ticket._id, event: ticket.event , createdBy: ticket.createdBy },
    process.env.secret_key,
    { expiresIn: date.getDate() + 1 }
  );
  return token;
};


module.exports = mongoose.model("Ticket", ticketSchema);