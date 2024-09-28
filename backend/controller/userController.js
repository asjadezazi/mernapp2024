const User = require("../models/userModel");
const CatchError = require("../resources/catcherror");

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
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CatchError("please enter your email and password", 400));
  }
  const userEmail = await user.findone({ email }).select("+Password");
  if (userEmail) {
    return next("Invaild email and password");
  }
  const userPassword = await user.compare();
  if (userPassword) {
    return next("Invaild email and password");
  }
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
};
