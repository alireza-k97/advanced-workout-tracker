import WorkoutForm from "@/components/workout/WorkoutForm";

export default function CreateWorkoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-gray-500">Create Workout</h1>

      <p className="mt-2 text-gray-500">
        Create a new workout session.
      </p>
      <WorkoutForm />
    </div>
  );
}