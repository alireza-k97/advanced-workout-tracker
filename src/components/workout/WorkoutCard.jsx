import Link from "next/link";
import DeleteWorkoutButton from "./DeleteWorkoutButton";
import EditWorkoutButton from "./EditWorkoutButton";

export default function WorkoutCard({
  id,
  name,
  date,
  duration,
  calories,
  exercises,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/workouts/${id}`}>
          <h2 className="text-xl font-semibold">{name}</h2>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{date}</span>

          <DeleteWorkoutButton id={id} />
          <EditWorkoutButton  id={id}/>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="mt-1 font-semibold">{duration} min</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Calories</p>
          <p className="mt-1 font-semibold">{calories} kcal</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Exercises</p>
          <p className="mt-1 font-semibold">{exercises}</p>
        </div>
      </div>
    </div>
  );
}
