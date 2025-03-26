import dbConnect from "@/app/lib/dbConnect";
import { NextRequest } from "next/server";
import eventModel from "@/app/models/event";
import "@/app/models/appointment";

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
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  await dbConnect();
  if (id) {
    const event = await eventModel.findById(id).populate("appointments");
    return Response.json(event);
  } else {
    const events = await eventModel.find().populate("appointments");
    return Response.json(events);
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    console.log(body);
    const newUser = await eventModel.create(body);

    return Response.json(newUser);
  } catch (error) {
    return Response.json(error);
  }
}
