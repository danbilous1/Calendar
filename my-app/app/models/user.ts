import mongoose from "mongoose";
import { User } from "../type";

const UserSchema = new mongoose.Schema<User>({
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
