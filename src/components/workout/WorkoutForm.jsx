"use client";

import { workoutSchemas } from "@/schemas/workoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function WorkoutForm({ workoutId, workout }) {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(workoutSchemas) });

  useEffect(() => {
    if (workout) {
      reset({
        name: workout.name,
        date: workout.date?.split("T")[0],
        duration: workout.duration,
        calories: workout.calories,
        exercises: workout.exercises,
      });
    }
  }, [workout, reset]);
  const onSubmit = async (data) => {
    try {
      const isEdit = Boolean(workoutId);

      const url = isEdit ? `/api/workouts/${workoutId}` : "/api/workouts";

      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          isEdit ? "Failed to update workout" : "Failed to create workout",
        );
      }

      const result = await response.json();

      console.log(result);

      router.push("/workouts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-xl space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Workout Name</label>

        <input
          type="text"
          {...register("name")}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="e.g. Push Day"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Date</label>

        <input
          type="date"
          {...register("date")}
          className="w-full rounded-lg border px-4 py-2"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Duration</label>

        <input
          type="number"
          {...register("duration", { valueAsNumber: true })}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Minutes"
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Calories</label>

        <input
          type="number"
          {...register("calories", { valueAsNumber: true })}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Calories burned"
        />
        {errors.calories && (
          <p className="mt-1 text-sm text-red-500">{errors.calories.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Exercises</label>

        <input
          type="number"
          {...register("exercises", { valueAsNumber: true })}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Number of exercises"
        />
        {errors.exercises && (
          <p className="mt-1 text-sm text-red-500">
            {errors.exercises.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg cursor-pointer bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
      >
        Create Workout
      </button>
    </form>
  );
}
