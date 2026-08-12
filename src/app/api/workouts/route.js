import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Workouts API is working" });
}

export async function POST(request) {
  const data = await request.json();

  console.log("new workout:", data);

  return NextResponse.json(
    { message: "workout create successfully", workout: data },
    { status: 201 },
  );
}
