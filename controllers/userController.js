import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get all users :
export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length === 0) {
      const error = new Error("no user found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

// Get all users by id :
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("user not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create user :
export const createUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      const error = new Error("All fields are required");
      error.status = 400;
      return next(error);
    }

    // Check email format :
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error("Invalid email format");
      error.status = 400;
      return next(error);
    }

    // Check password length :
    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.status = 400;
      return next(error);
    }

    // Check if email already exists :
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already in use");
      error.status = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "user successfully created", user: newUser });
  } catch (err) {
    next(err);
  }
};

// Delete user :
export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      const error = new Error("user not found");
      error.status = 404;
      return next(error); 
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    next(err);
  }
};
