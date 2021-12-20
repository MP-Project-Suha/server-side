const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSimple = require("jwt-simple");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

//nodemailer
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//Register controller
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const savedEmail = email.toLowerCase();
    const SALT = Number(process.env.SALT);
    const hashedPass = await bcrypt.hash(password, SALT);

    // Check if the email is in use
    const existingUser = await userModel.findOne({ email: savedEmail }).exec();
    if (existingUser) {
      return res.status(409).send({
        message: "Email is already in use.",
      });
    }

    // Step 1 - Create and save the user
    const newUser = new userModel({
      firstName,
      lastName,
      email: savedEmail,
      password: hashedPass,
      role,
    });
    newUser.save();
    // Step 2 - Generate verfication token
    const verificationToken = newUser.generateVerificationToken();
    // Step 3 - Email the user a unique verification link
    const url = `${process.env.FRONT_URL}/verify/${verificationToken}`;
    transporter.sendMail({
      to: savedEmail,
      subject: "Verify Your Account",
      html: `Click <a href = '${url}'>here</a> to confirm your email.`,
    });
  res.status(201).send({
      message: `Sent a verification email to ${savedEmail}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  register,
};
