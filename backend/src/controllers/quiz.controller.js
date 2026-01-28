import Question from "../models/Question.js";
import Result from "../models/Result.js";
import User from "../models/User.js";


const QUESTION_COUNT = 10;

// ================= START QUIZ =================
export const startQuiz = async (req, res) => {
  try {
    const userId = req.user.id;

    let result = await Result.findOne({ userId });

    // ❌ If already submitted → block
    if (result && result.submittedAt) {
      return res.status(403).json({ message: "Quiz already completed" });
    }

    // ✅ Random questions
    const questions = await Question.aggregate([
      { $sample: { size: QUESTION_COUNT } }
    ]);

    if (!questions.length) {
      return res.status(400).json({ message: "No questions found" });
    }

    // ✅ Create result ONLY when quiz actually starts
    if (!result) {

      const user = await User.findById(userId).select("name");

      result = await Result.create({
        userId,
        userName: user.name,
        questionIds: questions.map(q => q._id),
        answers: [],
        score: 0,
        totalQuestions: questions.length,
        percentage: 0,
        startedAt: new Date(),
        submittedAt: null,
        durationSeconds: questions.length * 5,
      });
    }

    const safeQuestions = questions.map(q => ({
      id: q._id.toString(),
      question: q.question,
      options: q.options,
    }));

    res.json({ questions: safeQuestions });

  } catch (err) {
    console.error("START QUIZ ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= SUBMIT QUIZ =================
export const submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    const result = await Result.findOne({ userId });

    if (!result) {
      return res.status(400).json({ message: "Quiz not started" });
    }

    const questions = await Question.find({
      _id: { $in: result.questionIds },
    });

    let score = 0;

    const detailedAnswers = questions.map(q => {
      const qid = q._id.toString();

      const selected = Number(answers[qid]);
      const correct = Number(q.correctIndex);

      const isCorrect = selected === correct;
      if (isCorrect) score++;

      return {
        questionId: q._id,
        selectedIndex: selected,
        correctIndex: correct,
        isCorrect,
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    result.answers = detailedAnswers;
    result.score = score;
    result.percentage = percentage;
    result.submittedAt = new Date();

    await result.save();

    res.json({
      score,
      totalQuestions: questions.length,
      percentage,
    });

  } catch (err) {
    console.error("SUBMIT QUIZ ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= CHECK QUIZ STATUS =================
export const checkQuizStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Result.findOne({ userId });

    // ✅ Never opened quiz
    if (!result) {
      return res.json({
        attempted: false,
        completed: false,
      });
    }

    // ✅ Opened quiz but NOT submitted
    if (!result.submittedAt) {
      return res.json({
        attempted: false,   // 🔥 FIXED
        completed: false,
      });
    }

    // ✅ Quiz completed
    return res.json({
      attempted: true,
      completed: true,
      score: result.score,
      percentage: result.percentage,
      totalQuestions: result.totalQuestions,
    });

  } catch (err) {
    console.error("STATUS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
