const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String , required: true, unique=true},
    password: { type: Array, required: true },
    avatar: { type: String },


    isDele: { type: Boolean, default: false, required: true },
    isVerfied: { type: Boolean, default: false, required: true },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
