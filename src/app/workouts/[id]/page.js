import { getWorkout } from "@/services/workoutService";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const workout = await getWorkout(id, token);

  if (!workout) {
    return <p>Workout not found.</p>;
  }

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Link
        href="/workouts"
        className="text-sm cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
      >
        ← Back to Workouts
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{workout.name}</h1>

      <div className="mt-6 space-y-2">
        <p>Date: {workout.date}</p>
        <p>Duration: {workout.duration}</p>
        <p>Calories: {workout.calories}</p>
        <p>Exercises: {workout.exercises}</p>
      </div>
    </div>
  );
}
