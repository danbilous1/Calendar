import dbConnect from "@/app/lib/dbConnect";
import appointmentModel from "@/app/models/appointment";
import { Schema } from "mongoose";

const mockAppointment = {
  _id: 1,
  eventId: "1",
  userId: "1",
  date: "dd/mm/yyyy",
  status: "scheduled",
};

// create get endpoint to see appointment
export async function GET() {
  // await dbConnect();
  // const appointments = await appointmentModel.find();
  return Response.json([mockAppointment]);
}

// create post endpoint to create appointment

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const newAppointment = await appointmentModel.create(body);

    return Response.json(newAppointment);
  } catch (error) {
    return Response.json(error);
  }
}
