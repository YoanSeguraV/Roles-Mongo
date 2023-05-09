import { Router } from "express";
import { createUser } from "../controller/User.controller.js";
import { verificar } from "../middleware/AuthUser.js";

const router = Router();

router.post("/register", verificar, createUser);
export default router;
