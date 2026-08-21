import { NextResponse } from "next/server";

export function errorResponse(message, status) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}

export function successResponse(data, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}
