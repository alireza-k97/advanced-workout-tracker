export default function Statscard({ title, value, description }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-2xl font-bold">{value}</h3>

      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  );
}
