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
    return next(new CatchError("Please enter your email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("User not found with email: ", email);
    return next(new CatchError("Invalid email or password", 401));
  }

  console.log("User found: ", user);

  const isPasswordMatch = await user.comparePassword(password);

  console.log("Password match result: ", isPasswordMatch);

  if (!isPasswordMatch) {
    return next(new CatchError("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
};
