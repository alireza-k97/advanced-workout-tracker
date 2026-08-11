import Link from "next/link";

export default function WorkoutCard({
  id,
  name,
  date,
  duration,
  calories,
  exercises,
}) {
  return (
    <Link href={`/workouts/${id}`}>
      <div className="rounded-xl border bg-white p-5 shadow-sm my-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{name}</h2>

          <span className="text-sm text-gray-500">{date}</span>
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
    </Link>
  );
}
