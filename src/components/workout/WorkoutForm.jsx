"use client";

import { useForm } from "react-hook-form";

export default function WorkoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-xl space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Workout Name</label>

        <input
          type="text"
          {...register("name", {
            required: "Workout name is required",
            minLength: {
              value: 3,
              message: "Workout name must be at least 3 characters",
            },
          })}
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
          {...register("date", { required: "date is required" })}
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
          {...register("duration", {
            required: "duration is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Duration must be at least 1 minute",
            },
          })}
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
          {...register("calories", {
            required: "calories is required",
            valueAsNumber: true,
            min: { value: 0, message: "Calories cannot be negative" },
          })}
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
          {...register("exercises", {
            required: "Number of exercise is required",
            valueAsNumber: true,
            min: { value: 1, message: "There must be at least 1 exercise" },
          })}
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
        className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
      >
        Create Workout
      </button>
    </form>
  );
}
