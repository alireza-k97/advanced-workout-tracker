import Link from "next/link";

async function getWorkout(id) {
  const response = await fetch(`http://localhost:3000/api/workouts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  const result = await response.json();

  return result.data;
}
export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

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
