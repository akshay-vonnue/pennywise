import { Router } from "express";
import {
  loginController,
  meController,
  registerController,
} from "./auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", meController);

export default router;
