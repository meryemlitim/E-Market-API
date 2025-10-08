import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true}, 
    email: { type: String, unique: true , required:true},
    password: { type: string, required: true },
    role: { type: string, default: "user" , enum: ["user", "admin"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
