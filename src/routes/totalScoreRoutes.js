const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getTotalScores } = require("../controllers/totalScoreController");

// Get score of user_id base on topic_id
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  const topic_id = req.query.topic_id;

  try {
    if (user_id && topic_id) {
      // const result = await pool.query(
      //   "SELECT * FROM total_scores WHERE user_id=$1 AND topic_id=$2",
      //   [user_id, topic_id],
      // );

      const totalScores = await getTotalScores(user_id, topic_id);
      return res.json({ data: totalScores });
    } else {
      return res
        .status(500)
        .json({ message: "User id and topic id query must have a value" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  const { user_id, topic_id, total_score, accuracy, time } = body;

  try {
    const newScore = await pool.query(
      "INSERT INTO total_scores (user_id, topic_id, total_score, accuracy) values ($1, $2, $3, $4)",
      [user_id, topic_id, total_score, accuracy],
    );

    return res.json(newScore.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
