import Question from "../models/Question.js";

export const uploadQuestions = async (req, res) => {
  await Question.insertMany(req.body);
  res.json({ message: "Questions uploaded" });
};
