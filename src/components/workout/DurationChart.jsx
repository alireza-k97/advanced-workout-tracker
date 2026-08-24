"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function DurationChart({ workouts }) {
  const data = workouts.map((workout) => ({
    name: workout.name,
    duration: workout.duration,
  }));
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Workout Duration</h2>

        <p className="mt-1 text-sm text-gray-500">Duration of each workout.</p>
      </div>

      <div className="mt-6 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="duration" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
