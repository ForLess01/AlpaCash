import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware";
import { getMe, createProfile } from "./auth.controller";

const router = Router();

router.get("/me", verifyToken, getMe);
router.post("/profile", verifyToken, createProfile);

export default router;
