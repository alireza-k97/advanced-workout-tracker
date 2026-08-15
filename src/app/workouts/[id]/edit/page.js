import WorkoutForm from "@/components/workout/WorkoutForm";

async function getWorkout(id) {
  const response = await fetch(`http://localhost:3000/api/workouts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}

export default async function EditWorkoutPage({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Workout</h1>

      <p className="mt-2 text-gray-500">Update your workout information.</p>

      <div className="mt-8">
        <WorkoutForm workoutId={id} workout={workout} />
      </div>
    </div>
  );
}
