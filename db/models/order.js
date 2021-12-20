const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tickets: [
      {
        ticket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ticket",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: { type: Date, default: Date.now },

    isDele: { type: Boolean, default: false, required: true },
    isVerfied: { type: Boolean, default: false, required: true },
    expired: { type: Boolean, default: false, required: true },

    createdAt: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
