import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { registerSchema } from "@/schemas/authSchema";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = registerSchema.safeParse(body);

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

    const { name, email, password } = validation.data;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Register error:", error);

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
