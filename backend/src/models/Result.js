import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: mongoose.Schema.Types.ObjectId,
    selectedIndex: Number,
    correctIndex: Number,
    isCorrect: Boolean,
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },



     userName: {
    type: String,
    required: true,
  },




    questionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    answers: [answerSchema],

    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },

    startedAt: Date,
    submittedAt: Date,
    durationSeconds: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
