import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user / Set token
// route POST api/users/auth
// access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(401);
    throw new Error("Invalud email or password");
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
  res.status(200).json({ message: "Register User" });
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

export { authUser, registerUser, logoutUser, updateUserProfile };
