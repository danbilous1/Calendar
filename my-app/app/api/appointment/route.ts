import dbConnect from "@/app/lib/dbConnect";
import appointmentModel from "@/app/models/appointment";
import { Schema } from "mongoose";
import userModel from "@/app/models/user";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const mockAppointment = {
  _id: 1,
  eventId: "1",
  userId: "1",
  date: "dd/mm/yyyy",
  status: "scheduled",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("appointmentId");
  const userId = request.headers.get("userId");

  await dbConnect();
  const existingUser = await userModel.findById(userId);
  if (id) {
    const appointment = await appointmentModel.findById(id);
    if (appointment.userId == userId || existingUser.isAdmin) {
      return Response.json({ appointment });
    } else {
      return Response.json(
        { message: "You are not allowed." },
        { status: 403 }
      );
    }
  } else {
    const appointments = await appointmentModel.find({ userId });
    return Response.json({ appointments });
  }
}

// create post endpoint to create appointment

export async function PUT(request: Request) {
  await dbConnect();
  const userId = request.headers.get("userId");
  const existingUser = await userModel.findById(userId);
  try {
    const body = await request.json();
    const findAppointment = await appointmentModel.findById(body._id);
    console.log(body);
    if (existingUser.isAdmin || findAppointment.userId == userId) {
      // findEvent - cursor
      if (findAppointment) {
        findAppointment.notes = body?.notes ?? findAppointment.notes;
        findAppointment.date = body?.date ?? findAppointment.date;
        findAppointment.endDate = body?.endDate ?? findAppointment.endDate;
        findAppointment.status = body?.type ?? findAppointment.status;
        await findAppointment.save();
        revalidatePath("/");
        return Response.json(
          { message: "Appointment updated successful" },
          { status: 201 }
        );
      } else {
        return Response.json(
          { message: "Appointment not found." },
          { status: 404 }
        );
      }
    }

    return Response.json({ message: "You are not allowed." }, { status: 403 });
  } catch (error) {
    return Response.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = request.headers.get("userId");
    body.userId = userId;
    const newAppointment = await appointmentModel.create(body);

    return Response.json(newAppointment);
  } catch (error) {
    return Response.json(error);
  }
}
