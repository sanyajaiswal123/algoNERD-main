import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getMeController,
} from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
  validate,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerController);
router.post("/login", loginValidation, validate, loginController);
router.post("/logout", logoutController);
router.get("/me", getMeController);

export default router;
