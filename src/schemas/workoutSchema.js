import { z } from "zod";

export const workoutSchemas = z.object({
  name: z.string().min(3, "Workout name must be at least 3 characters"),
  date : z.string().min(1 , "date is required") ,
  duration : z.number().min(1 , "Duration must be at least 1 minute"),
  calories : z.number().min(0 , "Calories cannot be negative"),
  exercises : z.number().min(1 , "There must be at least 1 exercise"),
});
