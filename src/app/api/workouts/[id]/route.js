import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { isValidObjectId } from "@/lib/objectId";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    await connectDB();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const workout = await Workout.findByIdAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!workout) {
      return errorResponse("Workout not found", 404);
    }

    return successResponse({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error("Delete workout error:", error);

    return errorResponse("Failed to delete workout", 500);
  }
}

export async function PATCH(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const data = await request.json();
    const workout = await Workout.findByIdAndUpdate({ _id:id, userId: user.userId }, data, {
      new: true,
      runValidators: true,
    });

    if (!workout) {
      return errorResponse("Workout not found", 404);
    }
    return successResponse(workout);
  } catch (error) {
    console.error("update workout error:", error);
    return errorResponse("Failed to update workout", 500);
  }
}

export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return errorResponse("Unauthorized", 401);
  }
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const workout = await Workout.findOne({
      _id: id,
      userId: user.userId,
    });

    if (!workout) {
      return errorResponse("workout not found", 404);
    }
    return successResponse(workout);
  } catch (error) {
    console.error("GET workout error:", error);
    return errorResponse("Failed to fetch workout", 500);
  }
}
