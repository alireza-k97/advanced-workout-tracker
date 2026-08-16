"use client";

import { useRouter } from "next/navigation";

export default function EditWorkoutButton({ id }) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/workouts/${id}/edit`);
  };
  return (
    <button
      type="button"
      onClick={handleEdit}
      className="rounded-lg cursor-pointer border border-yellow-300 px-3 py-1.5 text-sm text-yellow-500 hover:bg-yellow-50"
    >
      edit
    </button>
  );
}
