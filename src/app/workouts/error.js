"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="mt-2 text-gray-500">We couldn't load your workouts.</p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg cursor-pointer bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
