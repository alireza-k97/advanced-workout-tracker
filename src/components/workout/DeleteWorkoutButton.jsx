"use client";

import { useRouter } from "next/navigation";

export default function DeleteWorkoutButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      router.refresh();
    } catch (error) {
      console.error("Delete workout error:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg cursor-pointer border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}
