import { Router } from "express";
import { checkUsername, Login, Registration } from "../controllers/authRoutes.js";
const router = Router()

router.post("/login",Login)
router.post("/registration",Registration)
router.post("/checkusername",checkUsername)

export default router