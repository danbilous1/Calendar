import mongoose from "mongoose";
import { Appointment } from "../type";

const AppointmentSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    endDate: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["scheduled", "confirmed", "paid", "canceled", "commited"],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose?.models?.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

