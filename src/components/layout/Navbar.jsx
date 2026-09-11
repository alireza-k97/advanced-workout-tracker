"use client"
import { usePathname } from "next/navigation";
import LogoutToggle from "../LogoutToggle";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";
  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold">Workout Tracker</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {!isLoginPage && <LogoutToggle />}
      </div>
    </header>
  );
}
