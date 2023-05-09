import { Router } from "express";
import { verificar } from "../middleware/AuthUser.js";
import { UserId, Users, authUser, updateUser } from "../controller/User.controller.js";
import { isAdmin, isModerator, verificarToken } from "../middleware/VerificarToken.js";

const router = Router();

router.get("/users", verificarToken, Users);
router.get("/use/:id", UserId);

router.post("/user", authUser);
router.put("/users/:_id", updateUser);

router.delete("/user",[verificarToken,isModerator] ,Users);
router.put("/user",[verificarToken,isAdmin] ,Users);



export default router;
