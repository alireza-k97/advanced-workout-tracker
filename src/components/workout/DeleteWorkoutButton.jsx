"use client";

import { deleteWorkout } from "@/services/workoutService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../ui/ConfirmModal";

export default function DeleteWorkoutButton({ id }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteWorkout(id);
      toast.success("Workout deleted successfully");
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Delete workout error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={isDeleting}
        className="rounded-lg cursor-pointer border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
