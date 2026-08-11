import Link from "next/link";
const menuItems = [
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Workouts",
    href: "/workouts",
  },
  {
    title: "exercise",
    href: "/exercise",
  },
  {
    title: "Progress",
    href: "/progress",
  },
];
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4 shadow-green-300 ">
      <h1 className="mb-8 text-2xl font-bold">Workout Tracker</h1>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-4 py-2 hover:bg-gray-100"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
