import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
        404
      </h1>

      <p className="mt-3 text-gray-500 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}