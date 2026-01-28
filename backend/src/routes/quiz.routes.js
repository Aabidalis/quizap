import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  startQuiz,
  submitQuiz,
  checkQuizStatus
} from "../controllers/quiz.controller.js";

const router = express.Router();

// 🧠 Start Quiz
router.get("/start", auth, startQuiz);

// 📤 Submit Quiz
router.post("/submit", auth, submitQuiz);

// 📊 Check Quiz Status
router.get("/status", auth, checkQuizStatus);

export default router;
