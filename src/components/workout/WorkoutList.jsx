"use client";
import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutList({ workouts }) {
  const itemsperpage = 4;
  const [search, setSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [calorieFilter, setCalorieFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

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
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "duration-asc":
        return a.duration - b.duration;
      case "duration-desc":
        return b.duration - a.duration;
      case "calories-asc":
        return a.calories - b.calories;
      case "calories-desc":
        return b.calories - a.calories;
    }
  });
  const totalPages = Math.ceil(sortedWorkouts.length / itemsperpage);
  const startIndex = (currentPage - 1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const paginatedWorkouts = sortedWorkouts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, durationFilter, calorieFilter, sortBy]);
  return (
    <div>
      <div className="my-6 grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium dark:text-gray-400"
          >
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="workouts name ..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="Duration"
            className="mb-2 block text-sm font-medium dark:text-gray-400"
          >
            Duration
          </label>
          <select
            name="duration"
            id="Duration"
            value={durationFilter}
            onChange={(event) => setDurationFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="all">All duration</option>
            <option value="short">Less than 30 min</option>
            <option value="medium">30 - 60 min</option>
            <option value="long">More than 60 min</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="calories"
            className="mb-2 block text-sm font-medium dark:text-gray-400"
          >
            Calories
          </label>
          <select
            name="calories"
            id="calories"
            value={calorieFilter}
            onChange={(event) => setCalorieFilter(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="all">All calories</option>
            <option value="low">Less than 300 kcal</option>
            <option value="medium">300 - 500 kcal</option>
            <option value="high">More than 500 kcal</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mb-2 block text-sm font-medium">
            Sort by
          </label>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="duration-asc">Duration: Low → High</option>
            <option value="duration-desc">Duration: High → Low</option>
            <option value="calories-asc">Calories: Low → High</option>
            <option value="calories-desc">Calories: High → Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedWorkouts.map((workout) => (
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
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50 dark:text-gray-800"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "border dark:text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50 dark:text-gray-800"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
