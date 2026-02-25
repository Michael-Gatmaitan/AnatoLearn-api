const express = require("express");
const router = express.Router();
const pool = require("../../db");
const { getPassedScoreCount } = require("../../controllers/main-controller");

// Get act_qa using topic_id and it's act_type_id (tap, mcq, or tof [true or false])
// skeletal with "tap me" should be topic_id = 1 and act_type_id = 1
router.get("/qa", async (req, res) => {
  const user_id = req.query.user_id; // Need for checking passed scores count
  const topic_id = req.query.topic_id;
  const act_type_id = req.query.act_type_id;

  const difficulties = ['easy', 'medium', 'hard'];

  try {
    let passedScoreCount = await getPassedScoreCount(user_id, topic_id);

    let difficulty = 'easy';

    console.log("Passed score count: ", passedScoreCount);

    if (passedScoreCount === 0) {
      difficulty = difficulties[0]; // Easy
    } else if (passedScoreCount === 1) {
      difficulty = difficulties[1]; // Medium
    } else {
      difficulty = difficulties[2]; // Hard
    }

    console.log("Question difficulty: ", difficulty);

    const activity = (
      await pool.query(
        "SELECT * FROM activities WHERE act_type_id=$1 AND topic_id=$2",
        [act_type_id, topic_id],
      )
    ).rows[0];

    const act_id = activity.id;

    const act_qa = await pool.query(
      "SELECT * FROM act_qa WHERE act_id=$1 AND difficulty=$2 ORDER BY RANDOM() LIMIT 5",

      // "SELECT * FROM act_qa WHERE act_id=$1 ORDER BY ID",
      [act_id, difficulty],
    );

    return res.json({ data: act_qa.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// const
router.post("/qa", async (req, res) => {
  const { topic_id, act_type_id, question, answer, choices, difficulty } = req.body;

  try {
    const activity = (
      await pool.query(
        "SELECT * FROM activities WHERE act_type_id=$1 AND topic_id=$2",
        [act_type_id, topic_id],
      )
    ).rows[0];

    const act_id = activity.id;

    const newQA = await pool.query(
      "INSERT INTO act_qa (act_id, question, answer, choices, difficulty) VALUES ($1, $2, $3, $4, $5)",
      [act_id, question, answer, choices, difficulty],
    );

    console.log(newQA);
    return res.json({ newQA, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/qa", async (req, res) => {
  const id = req.query.id;

  try {
    const deletedQA = await pool.query("DELETE FROM act_qa WHERE id=$1", [id]);
    console.log(deletedQA);

    return res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
