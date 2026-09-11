"use client";

import { workoutSchemas } from "@/schemas/workoutSchema";
import { createWorkout, updateWorkout } from "@/services/workoutService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function WorkoutForm({ workoutId, workout }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      setSubmitError("");
      if (workoutId) {
        await updateWorkout(workoutId, data);
        toast.success("Workout updated successfully");
      } else {
        await createWorkout(data);
        toast.success("Workout created successfully");
      }
      router.push("/workouts");
    } catch (error) {
      toast.error("sorry try again!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      {submitError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}
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
        disabled={isSubmitting}
        className="rounded-lg cursor-pointer bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
      >
        {isSubmitting
          ? workoutId
            ? "Updating..."
            : "Creating..."
          : workoutId
            ? "Update Workout"
            : "Create Workout"}
      </button>
    </form>
  );
}
