import WorkoutCard from "@/components/workout/WorkoutCard";
import { getWorkouts } from "@/services/worcoutService";

import Link from "next/link";

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workouts</h1>

          <p className="mt-2 text-gray-500">
            Manage your workouts and track your training sessions.
          </p>
        </div>

        <Link
          href="/workouts/create"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Workout
        </Link>
      </div>
      <div>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            id={workout._id}
            name={workout.name}
            date={workout.date}
            duration={workout.duration}
            calories={workout.calories}
            exercises={workout.exercises}
          />
        ))}
      </div>
    </>
  );
}
