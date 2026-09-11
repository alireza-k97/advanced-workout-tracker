// export default function Statscard({ title, value, description }) {
//   return (
//     <div className="rounded-xl border bg-white p-5 shadow-sm">
//       <p className="text-sm text-gray-500">{title}</p>

//       <h3 className="mt-2 text-2xl font-bold">{value}</h3>

//       <p className="mt-1 text-sm text-gray-400">{description}</p>
//     </div>
//   );
// }
import { getWorkouts } from "@/services/workoutService";
import { cookies } from "next/headers";

export default async function Statscard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const workouts = await getWorkouts(token);
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

  return (
    <div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Workouts
          </p>

          <p className="mt-2 text-3xl font-bold dark:text-white">
            {totalWorkouts}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Calories
          </p>

          <p className="mt-2 text-3xl font-bold dark:text-white">
            {totalCalories}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">kcal</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Duration
          </p>

          <p className="mt-2 text-3xl font-bold dark:text-white">
            {totalDuration}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">minutes</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Average Duration
          </p>

          <p className="mt-2 text-3xl font-bold dark:text-white">
            {averageDuration}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-white">
            minutes / workout
          </p>
        </div>
      </div>
    </div>
  );
}
