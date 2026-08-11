export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div>
        <span className="text-sm text-gray-500">
          Welcome back!
        </span>
      </div>
    </header>
  );
}