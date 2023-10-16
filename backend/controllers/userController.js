import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

var smtpConfig = {
  service: "gmail",
  // use SSL
  auth: { user: "medigo777@gmail.com", pass: "adfhbsdtrhgrsoqi" },
};

const transporter = nodemailer.createTransport(smtpConfig);
//@desc Auth user / Set token
// route POST api/users/auth
// access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password)) && user.email_verified) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      location: user.location,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email_verified: user.email_verified,
    });
  } else if (user && !user.email_verified) {
    res.status(400);
    throw new Error("verification not done");
  } else {
    res.status(401);
    throw new Error("invalid password or email");
  }
});

//@desc Register a new user
// route POST api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  // console.log(userExist);
  if (userExist) {
    res.status(400);
    throw new Error("User alreasy exists");
  }
  const products = [];
  const user = await User.create({ name, email, password, products });
  if (user) {
    const verificationToken = user.generateVerificationToken();
    // console.log(verificationToken);
    const url = `https://rentit-api.onrender.com/api/users/verify/${verificationToken}`;
    const mailOptions = {
      from: "medigo777@gmail.com",
      to: email,
      subject: "Verify Account",
      html: `Click <a href = '${url}'>here</a> to confirm your email.`,
    };
    await transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The email was sent successfully");
      }
    });
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Logout user
// route POST api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const verifyUser = async (req, res, next) => {
  const token = req.params.token;
  // console.log(token);
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null;
  try {
    payload = jwt.verify(token, "hakunnamata");
  } catch (err) {
    return res.status(500).send(err);
  }
  console.log(payload);
  try {
    // Step 2 - Find user with matching ID
    const user = await User.findOne({ _id: payload.ID }).exec();
    console.log(user);
    if (!user) {
      return res.status(404).send({
        message: "User does not  exists",
      });
    }
    // Step 3 - Update user verification status to true
    user.email_verified = true;
    await user.save();
    return res.status(200).send({
      message: "Account Verified",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

//@desc update user profile
// route PUT api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;
    user.location = req.body.location || user.location;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      location: updatedUser.location,
      phoneNumber: updatedUser.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, logoutUser, updateUserProfile, verifyUser };
