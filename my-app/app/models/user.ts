import mongoose from "mongoose";
import { User } from "@/app/type";

const UserSchema = new mongoose.Schema<User>(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose?.models?.User ||
  mongoose.model<User>("User", UserSchema);
