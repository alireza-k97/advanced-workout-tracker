import { workouts } from "@/data/workouts";

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = workouts.find((workout) => workout.id === Number(id));

  if (!workout) {
    return <p>workout not found.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{workout.name}</h1>

      <div className="mt-6 space-y-2">
        <p>date : {workout.date}</p>
        <p>duration : {workout.duration}</p>
        <p>calories : {workout.calories}</p>
        <p>exercises : {workout.exercises}</p>
      </div>
    </div>
  );
}
