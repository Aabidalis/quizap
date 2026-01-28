
import Result from "../models/Result.js";

export const leaderboard = async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ score: -1 })
      .limit(10)
      .populate("userId", "name");

    const leaderboardData = results
      .filter(r => r.userId) // remove null users
      .map(r => ({
        name: r.userId.name,
        score: r.score
      }));

    res.json(leaderboardData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

