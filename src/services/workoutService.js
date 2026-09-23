const API_URL =
  typeof window !== "undefined"
    ? "/api/workouts"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/workouts`
      : "http://localhost:3000/api/workouts";


// const API_URL = "http://localhost:3000/api/workouts";

// export async function getWorkouts() {
//   const response = await fetch(API_URL);

//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || "Failed to fetch workouts");
//   }
//   return result.data;
// }

// export async function getWorkout(id) {
//   const response = await fetch(`${API_URL}/${id}`);
//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || "Failed to fetch workout");
//   }
//   return result.data;
// }

export async function getWorkouts(token) {
  console.log("API_URL:", API_URL);
  const response = await fetch(API_URL, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch workouts");
  }

  return result.data;
}

export async function getWorkout(id, token) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch workout");
  }

  return result.data;
}

export async function createWorkout(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create workout");
  }

  return result.data;
}

export async function updateWorkout(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update workout");
  }

  return result.data;
}

export async function deleteWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to delete workout");
  }

  return result.data;
}
