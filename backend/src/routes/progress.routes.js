import express from "express";
import {
  getProgressController,
  updateProgressController,
} from "../controllers/progress.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All progress routes require JWT authentication
router.use(protect);

router.get("/", getProgressController);
router.put("/", updateProgressController);

export default router;
