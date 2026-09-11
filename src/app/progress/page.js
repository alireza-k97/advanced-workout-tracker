import { getWorkouts } from "@/services/workoutService";
import CaloriesChart from "@/components/workout/CaloriesChart";
import DurationChart from "@/components/workout/DurationChart";
import { cookies } from "next/headers";

export default async function ProgressPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const workouts = await getWorkouts(token);
  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-gray-500">Progress</h1>

      <p className="mt-2 text-gray-500">Overview of your workout progress.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CaloriesChart workouts={workouts} />

        <DurationChart workouts={workouts} />
      </div>
    </div>
  );
}
