import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"
import"./database/conectDB.js"
import {createRoles} from './libs/InitialSetup.js'
import UserRoutes from './routes/User.routes.js'
import registerRoutes from './routes/Register.routes.js'

const PORT=process.env.PORT || 4000

const app = express();
createRoles()

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api",UserRoutes);
app.use("/api",registerRoutes);


app.listen(PORT, () => {
  console.log("servidor corriendo en el puerto " + PORT);
});
