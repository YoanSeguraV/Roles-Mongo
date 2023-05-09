import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { type } from "os";

const User = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "rol",
        type: Schema.Types.ObjectId,
        default:"user"
      },
    ],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

User.methods.encryptContrasena = async (contrasena) => {
  return bcrypt.hash(contrasena, 10);
};

User.statics.compareContrasena = async (password, contrasena) => {
  return await bcrypt.compare(password, contrasena);
};

export default model("User", User);
