const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDisc: { type: String, required: true },
    longDisc: { type: String },
    image: { type: String, required: true },
    location: { type: String, required: true },
    price: { type:Number, required: true },

    createdAt: { type: Date, default: Date.now },
    beginAt: { type: Date, required: true },
    endAt: { type: Date,  required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    isPublic: { type: Boolean, default: false, required: true },
    isDele: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default: false, required: true },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        unique:true,
     }]
  },

  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
