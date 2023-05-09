import User from "../models/User.js";
import Rol from "../models/Rol.js";

import Jwt from "jsonwebtoken";

export const Users = async (req, res) => {
    try {
      
      const newUser = await User.find().populate("roles");
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json("eror en el servidor " + error);
    }
  };
  export const UserId = async (req, res) => {
    try {
        const{id}=req.params
        console.log(id)
        console.log(req.params)
      
      const newUser = await User.findById({_id:id}).populate("roles");
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json("eror en el servidor " + error);
    }
  };

export const createUser = async (req, res) => {
  try {
    const { contrasena,roles } = req.body;
    const newUser = new User(req.body);
    newUser.contrasena = await newUser.encryptContrasena(contrasena);
    if(roles){
       const foundRoles= await Rol.find({name:{$in:roles}})
       newUser.roles=foundRoles.map(rol=>rol._id)
    }else{
        const role=await Rol.findOne({name:"user"})
        newUser.roles=[role._id]
    }
    newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json("eror en el servidor " + error);
  }
};
export const updateUser = async (req, res) => {
  try {
    const{_id}=req.params
    const newUser = await  User.findByIdAndUpdate(_id,req.body);
    console.log(newUser)
    res.json("actualizado correctamente");
  } catch (error) {
    res.status(500).json("eror en el servidor " + error);
  }
};

export const authUser = async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
  
      let errorMessage = '';
  
      if (!correo || !contrasena) {
        errorMessage = "complete todos los campos";
      } else {
        const user = await User.findOne({ correo }).populate("roles");
        if (!user) {
          errorMessage = "Por favor registrate";
        }
        const validateContrasena = await User.compareContrasena(
          contrasena,
          user.contrasena
        );
  
        if (!validateContrasena) {
          errorMessage = "Contrasena incorrecta";
        }
        if (errorMessage) {
          res.status(400).json(errorMessage);
        } else {
          const token = Jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
            expiresIn: 60 * 15,
          });
  
          res.status(200).json({
            token,
            message: "Login Correcto!",
            rol:user.roles
          });
        }
      }
    } catch (error) {
      res.status(500).json("eror en el servidor " + error);
    }
  };