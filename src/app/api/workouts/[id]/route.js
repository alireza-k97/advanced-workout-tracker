import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return NextResponse.json(
        {
          message: "Workout not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error("Delete workout error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete workout",
      },
      { status: 500 },
    );
  }
}
