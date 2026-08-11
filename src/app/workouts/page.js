import WorkoutCard from "@/components/workout/WorkoutCard";
import { workouts } from "@/data/workouts";

export default function WorkoutsPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Workouts</h1>
        <p className="mt-2 text-gray-500">
          Manage your workouts and track your training sessions.
        </p>
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
