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
    // Step 2 - Generate verification token
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

//verify controller
const verify = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }

    let payload = null;

    payload = jwt.verify(token, process.env.secret_key);

    userModel
      .findOneAndUpdate({ _id: payload.ID }, { isVerfied: true }, { new: true })
      .then((result) => {
        if (result) {
          res
            .status(201)
            .json({ message: "verified account successed", result });
        } else {
          res.status(404).send({
            message: "User does not  exists",
          });
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail, isDele: false })
    .then(async (result) => {
      if (result) {
        if (result.isVerfied == true) {
          const newpass = await bcrypt.compare(password, result.password);

          if (newpass) {
            const token = result.generateToken();
            res.status(201).json({ result, token });
          } else {
            res.status(404).json("Invalid password  or email");
          }
        } else {
          return res.status(403).json({
            message: "Verify your Account.",
          });
        }
      } else {
        res.status(404).json("Invalid password  or email");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

//log in with google
const client = new OAuth2Client(process.env.CLIENT_ID);
const googleLogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    })
    .then((result) => {
      // console.log("result from google",result.payload);
      const { email_verified, name, email, profileObj } = result.payload;
      if (email_verified) {
        userModel.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json(err);
          } else {
            if (user) {
              //login
              const token = user.generateToken();
              const result = {
                _id: user._id,
                firstName: name,
                lastName: name,
                email,
                role: process.env.USER_ROLE,
              };
              res.status(200).json({ result, token });
            } else {
              //create new user
              let password = email + process.env.secret_key;
              const newUser = new userModel({
                firstName: name,
                lastName: name,
                password,
                email,
                role: process.env.USER_ROLE,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json(err);
                }

                const token = data.generateToken();
               
                // const { _id, firstName,lastName, email, role } = newUser;
                res.status(200).json({ result: data, token });
              });
            }
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};


// forget password controller
const forgetPassword = (req, res) => {
  const { email } = req.body; //to send email to user
  const savedEmail = email.toLowerCase();
  if (savedEmail) {
    userModel
      .findOne({ email: savedEmail })
      .then((result) => { //email found
        if (result) {
          console.log(result);
          const payload = {
            id: result._id, // User ID from database
            email: savedEmail,
          };

          console.log(payload, "pay");
          // one-time-use token 
          const secret = result.password + `-` + result.avatar;
          const token = jwtSimple.encode(payload, secret);

//Send email containing link to reset password.
          const url = `${process.env.FRONT_URL}/${payload.id}/${token}`;
          transporter.sendMail({
            to: savedEmail,
            subject: "Reset password link",
            html: `Click <a href = '${url}'>here</a> to reset password.`,
          });

          res.status(200).json("email sent successfully");
        } else {
          res.status(404).json("not found email");
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
};

const resetPassword = (req, res) => {
  const { _id } = req.params; //user id
  const { token } = req.params;
  userModel.findById(_id).then((result) => {
    const secret = result.password + `-` + result.avatar;
    const payload = jwtSimple.decode(token, secret);
  });

  userModel.findById(id).then(async (result) => {
    const { password } = req.body;
    const SALT = Number(process.env.SALT);
    const hashedPass = await bcrypt.hash(password, SALT);
    if (hashedPass) {
      userModel
        .findByIdAndUpdate(id, { password: hashedPass })
        .then((result) => {
          const options = {
            expiresIn: "7d",
          };
          const token = result.generateToken();
          res
            .status(200)
            .json({
              result,
              token,
              message: "Your password has been successfully changed.",
            });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  });
};

module.exports = {
  register,
  verify,
  login,
  googleLogin,
  forgetPassword,
  resetPassword,
};
