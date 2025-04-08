import dbConnect from "@/app/lib/dbConnect";
import { NextRequest } from "next/server";
import eventModel from "@/app/models/event";
import "@/app/models/appointment";
import "@/app/models/user";
import userModel from "@/app/models/user";
import { PopulateOptions } from "mongoose";

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
  const userId = request.headers.get("userId");

  await dbConnect();
  const existingUser = await userModel.findById(userId);
  let populateObject: PopulateOptions | (string | PopulateOptions)[] = {
    path: "appointments",
    match: { userId: userId },
  };
  if (existingUser.isAdmin) {
    populateObject = {
      path: "appointments",
    };
  }
  if (id) {
    const event = await eventModel.findById(id).populate(populateObject);
    return Response.json({ events: event, isAdmin: existingUser.isAdmin });
  } else {
    const events = await eventModel.find().populate(populateObject);
    return Response.json({ events: events, isAdmin: existingUser.isAdmin });
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
