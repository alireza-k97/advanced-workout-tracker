"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CaloriesChart({ workouts }) {
  const data = workouts.map((workout) => ({
    name: workout.name,
    calories: workout.calories,
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Calories Burned</h2>

        <p className="mt-1 text-sm text-gray-500">
          Calories burned in each workout.
        </p>
      </div>

      <div className="mt-6 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="calories" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
