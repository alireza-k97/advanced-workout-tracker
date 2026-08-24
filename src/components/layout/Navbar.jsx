import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6   bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold">Workout Tracker</h1>
      <ThemeToggle />
    </header>
  );
}
