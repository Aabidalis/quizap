import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 2; // at least 2 options
        },
        message: "A question must have at least 2 options",
      },
    },

    correctIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    marks: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
