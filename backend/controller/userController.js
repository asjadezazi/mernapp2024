const trycatchError = require("../middleware/trycatchError");
const User = require("../models/userModel");
const CatchError = require("../resources/catcherror");
const sendToken = require("../resources/token");
const sendEmail = require("../resources/sendEmail");

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

// exports.checkEmail = trycatchError(async (req, res, next) => {
//   const { email } = req.body;

//   if (!email) {
//     return next(new CatchError("Email is required", 400));
//   }

//   const user = await User.findOne({ email });

//   if (user) {
//     return res.status(200).json({
//       success: true,
//       message: "Email found",
//     });
//   } else {
//     return next(new CatchError("Email not found", 404));
//   }
// });

exports.forgetPassword = trycatchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new CatchError("Email not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get( "host" )} /api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is: ${resetPasswordUrl} if you not requested then ignore the message`;
  try {
    await sendEmail({
      email: user.email,
      subject: "WoCommerce Password Recovery ",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new CatchError(error.message, 500));
  }
});
