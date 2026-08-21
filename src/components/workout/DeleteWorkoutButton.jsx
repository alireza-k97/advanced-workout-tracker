"use client";

import { deleteWorkout } from "@/services/worcoutService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWorkoutButton({ id }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting("true");
      await deleteWorkout(id);

      router.refresh();
    } catch (error) {
      console.error("Delete workout error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg cursor-pointer border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
