import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/workout";

export async function DELETE(request , { params }) {
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

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    const workout = await Workout.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!workout) {
      return NextResponse.json(
        { message: "workout not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Workout updated successfully" },
      workout,
    );
  } catch (error) {
    console.error("update workout error:", error);
    return NextResponse.json(
      { message: "Failed to update workout" },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const workout = await Workout.findById(id);

    if (!workout) {
      return NextResponse.json(
        { message: "worcout not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(workout)
  } catch (error) {
    console.error("GET workout error:" , error)
    return NextResponse.json({message : "Failed to fetch workout"},{status:500})
  }
}
