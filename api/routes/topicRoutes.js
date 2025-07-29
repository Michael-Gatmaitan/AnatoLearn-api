const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all topics or by id
router.get("/", async (req, res) => {
  const topic_id = req.query.topic_id;
  let result;

  try {
    if (topic_id) {
      result = await pool.query("SELECT * FROM topics WHERE id=$1", [topic_id]);

      return res.json(result.rows[0]);
    } else {
      result = await pool.query("SELECT * FROM topics ORDER BY id");
      return res.json({ data: result.rows });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
