import { validateData } from "../middleware/validator";
import { Router } from "express";
import { loginSchema, registerSchema } from "../schemas/userSchemas";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);


export default router;


