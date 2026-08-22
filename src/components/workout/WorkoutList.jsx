"use client";
import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutList({ workouts }) {
  const [search, setSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [calorieFilter, setCalorieFilter] = useState("all");

  const filteredWorkouts = workouts
    .filter((workout) =>
      workout.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((workout) => {
      if (durationFilter === "all") {
        return true;
      }
      if (durationFilter === "short") {
        return workout.duration < 30;
      }
      if (durationFilter === "medium") {
        return workout.duration >= 30 && workout.duration <= 60;
      }
      if (durationFilter === "long") {
        return workout.duration > 60;
      }
      return true;
    })
    .filter((workout) => {
      if (calorieFilter === "all") {
        return true;
      }
      if (calorieFilter === "low") {
        return workout.calories < 300;
      }
      if (calorieFilter === "medium") {
        return workout.calories >= 300 && workout.calories <= 500;
      }
      if (calorieFilter === "high") {
        return workout.calories > 500;
      }
      return true;
    });
  return (
    <div>
      <div className="my-6">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search workouts ..."
          className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>
      <div className="flex gap-4">
        <div className="my-4">
          <label htmlFor="Duration" className="mb-2 block text-sm font-medium">
            Duration
          </label>
          <select
            name="duration"
            id="Duration"
            value={durationFilter}
            onChange={(event) => setDurationFilter(event.target.value)}
            className="rounded-lg border px-4 py-2.5 outline-none"
          >
            <option value="all">All duration</option>
            <option value="short">Less than 30 min</option>
            <option value="medium">30 - 60 min</option>
            <option value="long">More than 60 min</option>
          </select>
        </div>
        <div className="my-4">
          <label htmlFor="calories" className="mb-2 block text-sm font-medium">
            Calories
          </label>
          <select
            name="calories"
            id="calories"
            value={calorieFilter}
            onChange={(event) => setCalorieFilter(event.target.value)}
            className="rounded-lg border px-4 py-2.5 outline-none"
          >
            <option value="all">All calories</option>
            <option value="low">Less than 300 kcal</option>
            <option value="medium">300 - 500 kcal</option>
            <option value="high">More than 500 kcal</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            id={workout._id}
            name={workout.name}
            date={workout.date}
            duration={workout.duration}
            calories={workout.calories}
            exercises={workout.exercises}
          />
        ))}
        {filteredWorkouts.length === 0 && (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="font-medium">No workouts found</p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
