import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get all users :
export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if(!allUsers) return res.status(404).json({ message: "no user found" });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
};

// Get all users by id :
export const getUserById = async (req, res) => {
 try {
    const user = await User.findById(req.params.id)
     
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create user :
export const createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "user successfully created", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user :
export const deleteUser = async (req, res) => {
  try { 
     const deleteUser = await User.findByIdAndDelete(req.params.id)
     if (!deleteUser)
       return res.status(404).json({ message: "user not found" });
     res.status(200).json({ message: "user deleted successfully" });
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
};
