import express from "express";
import {
  getProgressController,
  updateProgressController,
} from "../controllers/progress.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../validators/auth.validator.js";
import { updateProgressValidation } from "../validators/progress.validator.js";

const router = express.Router();

// All progress routes require JWT authentication
router.use(protect);

router.get("/", getProgressController);
router.put("/", updateProgressValidation, validate, updateProgressController);

export default router;
