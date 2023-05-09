import mongoose from "mongoose";

((async) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("conexion exitosa🎉");
  } catch (error) {
    console.log("conexion fallida🧨" + error);
  }
})();
