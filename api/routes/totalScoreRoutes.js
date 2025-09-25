const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getTotalScores,
  getPassedScores,
} = require("../controllers/main-controller");

// Get score of user_id base on topic_id
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  const topic_id = req.query.topic_id;
  const get_passed_scores = req.query.get_passed_scores;

  try {
    if (user_id && topic_id) {
      if (get_passed_scores == true || get_passed_scores == "true") {
        console.log("getting highest scores");
        const passed_scores = await getPassedScores(user_id, topic_id);
        return res.json({ data: passed_scores });
      }

      console.log("getting total scores");

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

router.get("/u", async (req, res) => {
  const user_id = req.query.user_id;
  const get_passed_scores = req.query.get_passed_scores;

  console.log(get_passed_scores);

  try {
    if (user_id == null)
      return res.json({
        message:
          "User id cannot be null in getting all scores of user in the topic.",
      });

    const q = "SELECT * FROM total_scores WHERE user_id=$1 ORDER BY topic_id";
    const p = [user_id];

    const scores = await pool.query(q, p);
    return res.json({ data: scores.rows });
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

router.get("/total-attempts", async (req, res) => {
  const user_id = req.query.user_id;
  const topic_id = req.query.topic_id;

  try {
    const selectQuery =
      "SELECT COUNT(id) FROM total_scores WHERE user_id=$1 and topic_id=$2";
    const params = [user_id, topic_id];

    const result = await pool.query(selectQuery, params);
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// router.get("/")

module.exports = router;
