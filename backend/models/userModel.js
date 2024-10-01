const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
  
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name cannot exceed 25 characters"],
    minlength: [4, "Name should have more than 4 characters"],
    required: [true, "Please enter your User name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should have more than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (userPassword) {
  console.log("Entered Password: ", userPassword);
  console.log("Hashed Password from DB: ", this.password);
  return await bcryptjs.compare(userPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
