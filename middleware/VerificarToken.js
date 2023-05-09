import Jwt from "jsonwebtoken";
import rol from "../models/Rol.js";
import User from "../models/User.js";

export const verificarToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) {
      return res.status(400).json("No existe el token");
    }
    token = token.split(" ")[1];
    const descoded = Jwt.verify(token, process.env.JWT_TOKEN);
    req.idUsuario = descoded.id;

    const user = await User.findById(req.idUsuario, { contrasena: 0 });
    if (!user) return res.status(404).json({ message: "no existe usuario" });

    next();
  } catch (error) {
    res.status(400).json("No autorizado");
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.idUsuario);
  console.log(user);
  const Rol = await rol.find({ _id: { $in: user.roles } });
  console.log(Rol);

  for (let i = 0; i < Rol.length; i++) {
    if (Rol[i].name === "moderador") {
      next();
      return;
    }
    
  }
  return res.status(403).json("requiere moderator rol");
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.idUsuario);
  const Rol = await rol.find({ _id: { $in: user.roles } });

  for (let i = 0; i < Rol.length; i++) {
    if (Rol[i].name === "admin") {
      next();
      return;
    }
   
  }
  return res.status(403).json("requiere admin rol");
};
