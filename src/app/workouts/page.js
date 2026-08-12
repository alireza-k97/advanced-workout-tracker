import WorkoutCard from "@/components/workout/WorkoutCard";
import { workouts } from "@/data/workouts";
import Link from "next/link";

export default function WorkoutsPage() {
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
            key={workout.id}
            id={workout.id}
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
