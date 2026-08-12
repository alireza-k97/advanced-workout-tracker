import { workouts } from "@/data/workouts";
import Link from "next/link";

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = workouts.find((workout) => workout.id === Number(id));

  if (!workout) {
    return <p>workout not found.</p>;
  }

  return (
    <div>
      <Link
        href={"/workouts"}
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to Workouts
      </Link>
      <h1 className=" mt-6 text-3xl font-bold">{workout.name}</h1>

      <div className="mt-6 space-y-2">
        <p>date : {workout.date}</p>
        <p>duration : {workout.duration}</p>
        <p>calories : {workout.calories}</p>
        <p>exercises : {workout.exercises}</p>
      </div>
    </div>
  );
}
