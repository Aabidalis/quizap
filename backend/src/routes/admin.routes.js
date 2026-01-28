import express from "express";
import { uploadQuestions } from "../controllers/admin.controller.js";

const router = express.Router();
router.post("/questions", uploadQuestions);

export default router;
