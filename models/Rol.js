import { Schema, model } from "mongoose";

const rol = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default model("rol", rol);
