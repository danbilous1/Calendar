import mongoose from "mongoose";
import { Appointment } from "../type";

const AppointmentSchema = new mongoose.Schema({
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
});

export default mongoose.models.Appointment ||
  mongoose.model<Appointment>("Appointment", AppointmentSchema);

// // type Appointment = {
//   id: string;
//   eventId: EventT["id"];
//   userId: User["id"];
//   date?: string;
//   status: "scheduled" | "confirmed" | "paid" | "canceled" | "commited";
// };
