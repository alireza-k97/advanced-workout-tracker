import { errorResponse, successResponse } from "@/lib/apiResponse";
import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const Workouts = await Workout.find().sort({ createdAt: -1 });
    return successResponse(Workouts);
  } catch (error) {
    console.error("Get workouts error:", error);
    return errorResponse("Failed to fetch workouts", 500);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const workout = await Workout.create(data);
    return successResponse(workout, 201);
  } catch (error) {
    console.error("create workout error:", error);
    return errorResponse("Failed to create workout", 500);
  }
}
