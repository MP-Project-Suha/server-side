const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    rate: { type: Number, required: true  },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
      },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", rateSchema);
