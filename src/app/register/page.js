"use client";

import { registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Create your account to start tracking workouts.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-gray-900"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-gray-900"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-gray-900"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
