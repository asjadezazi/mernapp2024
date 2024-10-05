const User = require("../models/userModel");
const CatchError = require("../resources/catcherror");
const sendToken = require("../resources/token");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample profile url",
    },
  });
  sendToken(user, 201, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CatchError("Please enter your email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new CatchError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new CatchError("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
};

exports.logoutUser = (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({
    success: true,
    message: "LogOut",
  });
};
