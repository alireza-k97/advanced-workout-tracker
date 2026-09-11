"use client";

export default function Error({ reset }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong
      </h1>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We could not load this page.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Try again
      </button>
    </main>
  );
}