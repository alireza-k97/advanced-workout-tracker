import Statscard from "@/components/dashboard/StatsCard";
import { cookies } from "next/headers";
import LoginPage from "./login/page";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div>
        <h1 className="text-3xl font-bold">wellcome</h1>
        <p className="mt-2 text-gray-500">
          please login or craete acount
        </p>
        <LoginPage />
      </div>
    );
  }
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Workout Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Track your workouts and monitor your progress.
        </p>
      </div>
      {/* <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}
      {/* {statsdata.map((stat) => (
          <Statscard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))} */}
      <Statscard />
      {/* </div> */}
    </>
  );
}
