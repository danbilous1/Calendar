import dbConnect from "@/app/lib/dbConnect";
import { NextRequest } from "next/server";
import eventModel from "@/app/models/event";
import "@/app/models/appointment";
import "@/app/models/user";
import userModel from "@/app/models/user";
import { PopulateOptions } from "mongoose";
import { getevents } from "@/app/actions/getevents";
import { revalidatePath } from "next/cache";

const mockEvent = {
  _id: "1",
  creatorId: "1",
  date: "dd/mm/yyyy",
  type: "",
  description: "",
  schedule: "hh:mm",
  capacity: 1,
};

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  const [events, isAdmin] = await getevents(userId);
  return Response.json({ events: events, isAdmin: isAdmin });
}

export async function POST(request: Request) {
  await dbConnect();
  const userId = request.headers.get("userId");
  const existingUser = await userModel.findById(userId);
  try {
    const body = await request.json();
    body.creatorId = userId;
    console.log(body);
    if (existingUser.isAdmin) {
      const newEvent = await eventModel.create(body);
      return Response.json(newEvent);
    }

    return Response.json({ message: "You are not allowed." }, { status: 403 });
  } catch (error) {
    return Response.json(error);
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const userId = request.headers.get("userId");
  const existingUser = await userModel.findById(userId);
  try {
    const body = await request.json();
    console.log(body);
    if (existingUser.isAdmin) {
      const findEvent = await eventModel.findById(body._id);
      if (findEvent) {
        findEvent.description = body?.description ?? findEvent.description;
        findEvent.date = body?.date ?? findEvent.date;
        findEvent.endDate = body?.endDate ?? findEvent.endDate;
        findEvent.type = body?.type ?? findEvent.type;
        findEvent.capacity = body?.capacity ?? findEvent.capacity;

        await findEvent.save();
        revalidatePath("/");
        return Response.json(
          { message: "Event updated successful" },
          { status: 201 }
        );
      } else {
        return Response.json({ message: "Event not found." }, { status: 404 });
      }
      const newEvent = await eventModel.create(body);
      return Response.json(newEvent);
    }

    return Response.json({ message: "You are not allowed." }, { status: 403 });
  } catch (error) {
    return Response.json(error);
  }
}
