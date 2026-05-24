import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMyProfile, updateMyProfile } from "./profiles.controller";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

export default router;
