import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/models/user";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return Response.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    } else {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({
        id: existingUser._id.toString(),
        email: existingUser.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("20m")
        .sign(secret);
      (await cookies()).set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 20 * 60,
        path: "/",
      });

      return Response.json(
        {
          success: true,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
