import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { loginSchema } from "@/schemas/authSchema";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { email, password } = validation.data;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
