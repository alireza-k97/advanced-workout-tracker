import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { isValidObjectId } from "@/lib/objectId";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const workout = await Workout.findByIdAndDelete(id);

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
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const data = await request.json();
    const workout = await Workout.findByIdAndUpdate(id, data, {
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
  try {
    await connectDB();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return errorResponse("Invalid workout ID", 400);
    }
    const workout = await Workout.findById(id);

    if (!workout) {
      return errorResponse("workout not found", 404);
    }
    return successResponse(workout);
  } catch (error) {
    console.error("GET workout error:", error);
    return errorResponse("Failed to fetch workout", 500);
  }
}
