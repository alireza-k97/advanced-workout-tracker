import { errorResponse, successResponse } from "@/lib/apiResponse";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }
  try {
    await connectDB();
    const Workouts = await Workout.find({ userId: user.userId }).sort({
      createdAt: -1,
    });
    return successResponse(Workouts);
  } catch (error) {
    console.error("Get workouts error:", error);
    return errorResponse("Failed to fetch workouts", 500);
  }
}

export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }
  try {
    await connectDB();
    const data = await request.json();
    const workout = await Workout.create({ ...data, userId: user.userId });
    return successResponse(workout, 201);
  } catch (error) {
    console.error("create workout error:", error);
    return errorResponse("Failed to create workout", 500);
  }
}
