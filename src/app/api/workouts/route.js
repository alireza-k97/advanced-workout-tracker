import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const Workouts = await Workout.find().sort({ createdAt: -1 });
    return NextResponse.json(Workouts);
  } catch (error) {
    console.error("Get workouts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch workouts" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const workout = await Workout.create(data);
    return NextResponse.json(
      { message: "workout create successfully", workout },
      { status: 201 },
    );
  } catch (error) {
    console.error("create workout error:", error);
    return NextResponse.json(
      { message: "Failed to create workout" },
      { status: 500 },
    );
  }
}
