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
    <div className="space-y-3">
      <Link
        href="/workouts"
        className="text-sm cursor-pointer text-gray-500 hover:text-gray-900"
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
