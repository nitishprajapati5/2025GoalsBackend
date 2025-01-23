import { Router } from "express";
import { tokenAuthorization } from "../middleware/tokenAuthorization.js";
import { dashboard } from "../controllers/dashboard.js";

const router = Router()

router.get("/dashboard",tokenAuthorization,dashboard)

export default router;