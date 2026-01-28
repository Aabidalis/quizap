import mongoose from "mongoose";
import Question from "./models/Question.js";
import dotenv from "dotenv";

dotenv.config();

const questions = [
  {
    question: "ವಿಜಯನಗರ ಚಕ್ರವರ್ತಿಗಳು ಕಲಿಸೆ ನಾಡು (ನಾಡಕಲಸಿ) ರಾಜ್ಯವನ್ನು ಕೆಳದಿ ಸಾಮ್ರಾಜ್ಯದ ಯಾವ ಸಂಸ್ಥಾಪಕನಿಗೆ ಅರ್ಪಿಸಿದರು?",
    options: [
      "ಸದಾಶಿವ ನಾಯಕ",
      "ಚೌಡಪ್ಪ ನಾಯಕ",
      "ವೆಂಕಟಪ್ಪ ನಾಯಕ",
      "ಶಿವಪ್ಪ ನಾಯಕ"
    ],
    correctIndex: 1
  },
  {
    question: "ಶಕ 1607 ರ ದಿನಾಂಕದ ಕೆಳದಿ ರಾಜಮನೆತನಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ತಾಮ್ರ ಫಲಕದ ಅನುದಾನವು ASI/ಶಾಸನ ಪಟ್ಟಿಗಳಲ್ಲಿ ಯಾರ ಒಡೆತನದಲ್ಲಿದೆ?",
    options: [
      "ಕಾಯಾನಿ ಹನುಮಂತಾಚಾರ್ಯ",
      "ಹರಿದಾಸ ಪಂಡಿತ್",
      "ಬಾಲೆಯಣ್ಣ ಪೆರ್ಗಡೆ",
      "ಕೆ. ಎಸ್. ಮಣಿ"
    ],
    correctIndex: 0
  },
  {
    question: "1218 AD ನಲ್ಲಿ ಸೋಮೇಶ್ವರ (ರಾಮೇಶ್ವರ) ದೇವಾಲಯವನ್ನು ಯಾವ ಸ್ಥಳೀಯ ಮುಖ್ಯಸ್ಥರು ನಿರ್ಮಿಸಿದರು?",
    options: [
      "ಬಾಳೆಯಣ್ಣ ವೆಗ್ಗಡೆ (ಪೆರ್ಗಡೆ)",
      "ಬೊಮ್ಮರಸ",
      "ಬೀರದೇವರಸ",
      "ಪಡವಲಗೊಂಗಣ"
    ],
    correctIndex: 0
  },
  {
    question: "ಕಾಗೋಡು ಸತ್ಯಾಗ್ರಹ (1951) ರೈತ ಚಳವಳಿಯ ಸ್ಥಳೀಯ ಸಂಘಟಕ ಯಾರು?",
    options: [
      "ಎಚ್. ಗಣಪತಿಯಪ್ಪ",
      "ಶಾಂತವೇರಿ ಗೋಪಾಲ ಗೌಡ",
      "ಕೆ. ಜಿ. ಒಡೆಯರ್",
      "ರಾಮ್ ಮನೋಹರ್ ಲೋಹಿಯಾ"
    ],
    correctIndex: 0
  },
  {
    question: "ಹಂದಿಗೋಡು ಸಿಂಡ್ರೋಮ್ ಮೊದಲು ವರದಿ ಮಾಡಿದ ವೈದ್ಯರು ಯಾರು?",
    options: [
      "ಎಚ್. ಎಂ. ಚಂದ್ರಶೇಖರ್",
      "ಕೆ. ಎಸ್. ಮಣಿ",
      "ಎಂ. ಬಡದಾನಿ",
      "ವೀರೇಂದ್ರ ಪಿ.ಎಂ."
    ],
    correctIndex: 0
  },
  {
    question: "ಮಾರಿಕಾಂಬಾ ಜಾತ್ರೆ (ಸಾಗರ) ಯಾವ ಅವಧಿಯಲ್ಲಿ ಆಚರಿಸಲಾಗುತ್ತದೆ?",
    options: [
      "ವಾರ್ಷಿಕವಾಗಿ",
      "ದ್ವೈವಾರ್ಷಿಕವಾಗಿ",
      "ತ್ರೈಮಾಸಿಕವಾಗಿ",
      "ಐದು ಬಾರಿಯಂತೆ"
    ],
    correctIndex: 2
  },
  {
    question: "ಸಾಗರ ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ ಮೊದಲು ಯಾವಾಗ ಸ್ಥಾಪನೆಯಾಯಿತು?",
    options: [
      "1911",
      "1931",
      "1951",
      "1971"
    ],
    correctIndex: 1
  },
  {
    question: "ದೀವರು ಸಮುದಾಯದ ಹಸೆ ಚಿತ್ತಾರ ಪದ್ಧತಿಯ ಸರಿಯಾದ ವಿವರಣೆ ಯಾವುದು?",
    options: [
      "ಸುಣ್ಣ ಗೋಡೆಗಳ ಮೇಲೆ ಚಿತ್ರಣ",
      "ಕೆಂಪು ಮಣ್ಣು ಮತ್ತು ಹಸುವಿನ ಸಗಣಿ ಮೇಲ್ಮೈಗಳಲ್ಲಿ ವೃತ್ತಾಕಾರದ ಮತ್ತು ತ್ರಿಕೋನ ಲಕ್ಷಣಗಳು",
      "ಬಟ್ಟೆಯ ಮೇಲೆ ವ್ಯಾಪಾರ ಚಿತ್ರಣ",
      "ಪ್ರಾಣಿಗಳ ವಾಸ್ತವಿಕ ಚಿತ್ರಣ"
    ],
    correctIndex: 1
  },
  {
    question: "ವರದಹಳ್ಳಿ ಬೆಟ್ಟದ ದೇವಾಲಯವು ಯಾರ ಸಮಾಧಿಯ ಸುತ್ತಲೂ ನಿರ್ಮಿಸಲಾಗಿದೆ?",
    options: [
      "ಶ್ರೀ ರಾಘವೇಶ್ವರ ಭಾರತಿ",
      "ಶ್ರೀ ಶ್ರೀಧರ ಸ್ವಾಮಿಗಳು",
      "ಶ್ರೀ ಶಿರಡಿ ಸೈ ಬಾಬಾ",
      "ಶ್ರೀ ಸತ್ಯ ಸಾಯಿ ಬಾಬಾ"
    ],
    correctIndex: 1
  },
  {
    question: "ಕೆಳದಿ ರಾಮೇಶ್ವರ ದೇವಾಲಯವನ್ನು ಯಾವ ಕೆಳದಿ ನಾಯಕ ನಿರ್ಮಿಸಿದನು?",
    options: [
      "ಶಿವಪ್ಪ ನಾಯಕ",
      "ವೆಂಕಟಪ್ಪ ನಾಯಕ",
      "ಚೌಡಪ್ಪ ನಾಯಕ",
      "ರಾಣಿ ಚೆನ್ನಮ್ಮ"
    ],
    correctIndex: 2
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log("✅ All 10 questions inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting questions:", err);
    process.exit(1);
  }
};

seedQuestions();
