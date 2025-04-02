import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/models/user";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

// create get endpoint to see appointment
export async function GET() {
  await dbConnect();
  const users = await userModel.find();
  return Response.json(users);
}

// create post endpoint to create appointment

// create post endpoint to create user

export async function POST(request: Request) {
  await dbConnect();
  const { name, email, password } = await request.json();
  try {
    const salt = bcrypt.genSaltSync(2);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 403 });
    }

    const passCrypt = bcrypt.hashSync(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      password: passCrypt,
    });
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: newUser._id.toString(),
      email: newUser.email,
    })
      .setExpirationTime("20m")
      .sign(secret);
    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 20 * 60,
      path: "/",
    });
    return Response.json(newUser);
  } catch (error) {
    return Response.json(error);
  }
}

// create get entpoint to read user's data
