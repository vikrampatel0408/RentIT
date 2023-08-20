import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateTokens.js'
// Register User require email,name,password 
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    res.status(400).json({ message: "User is already exist" });
  }
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(404).json({ message: "invalid data" });
  }
  res.status(200).json({ message: "User regestired" });
};
//authUser require email,password
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(401);
    throw new Error("Invalud email or password");
  }
});
//logoutUser will logout the user and set cookie to 0
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export { registerUser,authUser ,logoutUser};
