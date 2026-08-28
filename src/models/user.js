import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
      trim: true,
    },
    email: {
      type: "string",
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: "string",
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
