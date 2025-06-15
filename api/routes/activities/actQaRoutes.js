const express = require("express");
const router = express.Router();
const pool = require("../../db");

// Get act_qa using topic_id and it's act_type_id (tap, mcq, or tof [true or false])
// skeletal with "tap me" should be topic_id = 1 and act_type_id = 1
router.get("/qa", async (req, res) => {
  const topic_id = req.query.topic_id;
  const act_type_id = req.query.act_type_id;

  try {
    const activity = (
      await pool.query(
        "SELECT * FROM activities WHERE act_type_id=$1 AND topic_id=$2",
        [act_type_id, topic_id],
      )
    ).rows[0];

    const act_id = activity.id;

    const act_qa = await pool.query("SELECT * FROM act_qa WHERE act_id=$1", [
      act_id,
    ]);

    return res.json({ data: act_qa.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/qa", async (req, res) => {
  // const
  const { topic_id, act_type_id, question, answer, choices } = req.body;

  try {
    const activity = (
      await pool.query(
        "SELECT * FROM activities WHERE act_type_id=$1 AND topic_id=$2",
        [act_type_id, topic_id],
      )
    ).rows[0];

    const act_id = activity.id;

    const newQA = await pool.query(
      "INSERT INTO act_qa (act_id, question, answer, choices) VALUES ($1, $2, $3, $4)",
      [act_id, question, answer, choices],
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
