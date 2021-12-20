const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },

    isDele: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    expired: { type: Boolean, default: false, required: true },

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

module.exports = mongoose.model("Ticket", ticketSchema);
