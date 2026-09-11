import Link from "next/link";
const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Workouts",
    href: "/workouts",
  },
  // {
  //   title: "exercise",
  //   href: "/exercise",
  // },
  {
    title: "Progress",
    href: "/progress",
  },
];
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white dark:border-gray-800 dark:bg-gray-900 dark:text-white p-4 shadow-green-300 hidden md:block md:w-64 md:shrink-0 ">
      <h1 className="mb-8 text-2xl font-bold">Workout Tracker</h1>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:text-gray-900"
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
