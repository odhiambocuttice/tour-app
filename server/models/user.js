// Tables on the DB

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  Id: { type: String },
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now },
  //   isAdmin: { type: Boolean, default: false },
  //   isActive: { type: Boolean, default: true },
  //   isDeleted: { type: Boolean, default: false },
  //   isVerified: { type: Boolean, default: false },
});

export default mongoose.model("UserModel", userSchema);
