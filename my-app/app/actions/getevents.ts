import dbConnect from "@/app/lib/dbConnect";
import eventModel from "@/app/models/event";
import "@/app/models/appointment";
import "@/app/models/user";
import userModel from "@/app/models/user";
import { PopulateOptions } from "mongoose";
import { EventT } from "../type";
type ResultT = [EventT[], boolean];

export async function getevents(userId: string | null): Promise<ResultT> {
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
  const events = await eventModel.find().populate(populateObject);
  return [events, existingUser.isAdmin];
}
