const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String , required: true, unique:true},
    password: { type: String, required: true },
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

userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.secret_key
    );
    return verificationToken;
  };

  userSchema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign(
        { ID: user._id },
        process.env.secret_key, {  expiresIn: "7d"}
    );
    return token;
  };

module.exports = mongoose.model("User", userSchema);