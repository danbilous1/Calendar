import mongoose from "mongoose";
import { EventT, User } from "../type";

const EventSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

EventSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "eventId",
});

EventSchema.set("toJSON", {
  virtuals: true,
});

EventSchema.set("toObject", {
  virtuals: true,
});

export default mongoose?.models?.Event ||
  mongoose.model<EventT>("Event", EventSchema);

