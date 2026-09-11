import WorkoutForm from "@/components/workout/WorkoutForm";
import { getWorkout } from "@/services/workoutService";
import { cookies } from "next/headers";

export default async function EditWorkoutPage({ params }) {
 const { id } = await params;
 
   const cookieStore = await cookies();
 
   const token = cookieStore.get("token")?.value;
 
   const workout = await getWorkout(id, token);

  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-gray-500">Edit Workout</h1>

      <p className="mt-2 text-gray-500">Update your workout information.</p>

      <div className="mt-8">
        <WorkoutForm workoutId={id} workout={workout} />
      </div>
    </div>
  );
}
