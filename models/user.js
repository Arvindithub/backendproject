import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must contain at least 3 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must contain at least 8 characters"],
    maxlength: [30, "Password cannot exceed 30 characters"]
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ['job seeker', 'employer']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hashing the password
userSchema.pre('save', async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a JWT token for authorization
userSchema.methods.getJWTToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};

const User = mongoose.model("User", userSchema);

export default User;

