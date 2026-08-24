import CaloriesChart from "@/components/workout/CaloriesChart";
import DurationChart from "@/components/workout/DurationChart";
import { getWorkouts } from "@/services/worcoutService";
import Link from "next/link";

export default async function DashboardPage() {
  const workouts = await getWorkouts();
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.calories,
    0,
  );
  const totalDuration = workouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );
  const averageDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-gray-500">Dashboard</h1>

      <p className="mt-2 text-gray-500">Overview of your workout activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Workouts</p>

          <p className="mt-2 text-3xl font-bold dark:text-white">{totalWorkouts}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Calories</p>

          <p className="mt-2 text-3xl font-bold dark:text-white">{totalCalories}</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">kcal</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Duration</p>

          <p className="mt-2 text-3xl font-bold dark:text-white">{totalDuration}</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">minutes</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-500">Average Duration</p>

          <p className="mt-2 text-3xl font-bold dark:text-white">{averageDuration}</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">minutes / workout</p>
        </div>
      </div>
      <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Workouts</h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest workout activity.
            </p>
          </div>

          <Link
            href="/workouts"
            className="text-sm font-medium hover:underline"
          >
            View all
          </Link>
        </div>
        {recentWorkouts.length > 0 ? (
          <div className="mt-6 divide-y">
            {recentWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-medium">{workout.name}</p>

                  <p className="mt-1 text-sm text-gray-500">
                    {workout.duration} min · {workout.calories} kcal
                  </p>
                </div>

                <Link
                  href={`/workouts/${workout._id}`}
                  className="text-sm font-medium hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="font-medium">No workouts yet</p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first workout to see it here.
            </p>

            <Link
              href="/workouts/create"
              className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              Create Workout
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CaloriesChart workouts={workouts} />

        <DurationChart workouts={workouts} />
      </div>
    </div>
  );
}
