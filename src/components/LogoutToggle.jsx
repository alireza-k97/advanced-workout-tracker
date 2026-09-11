"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutToggle() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success("Logout successful");

      router.push("/login");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      Logout
    </button>
  );
}
