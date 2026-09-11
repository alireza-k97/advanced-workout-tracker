import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    exercises: {
      type: Number,
      required: true,
      min: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

export default Workout;
