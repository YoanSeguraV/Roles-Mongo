import User from "../models/User.js";

export const verificar = async (req, res, next) => {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) {
    return res.status(400).json("Ingrese todos los campos!");
  }
  const userCorreo = await User.findOne({ correo: correo });
  if (userCorreo) {
    return res.status(400).json("correo ya existente !");
  }

  next();
};
