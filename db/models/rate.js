const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    rate: { type: Number, required: true  },

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

module.exports = mongoose.model("Rate", rateSchema);
