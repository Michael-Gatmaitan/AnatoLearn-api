const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  getActivityScoresByTotalScoreId,
} = require("../controllers/main-controller");

// Get score of activity of user = user_id in topic of topic_id and act_type_id if it is tap, mcq or tof
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  const act_type_id = req.query.act_type_id;
  const topic_id = req.query.topic_id;

  try {
    if (user_id && act_type_id && topic_id) {
      // Valid
      const actScore = await pool.query(
        "SELECT * FROM activity_scores WHERE user_id=$1 AND act_type_id=$2 AND topic_id=$3",
        [user_id, act_type_id, topic_id]
      );
      console.log(actScore);
      return res.json(actScore.rows[0]);
    } else {
      const actScores = await pool.query("SELECT * FROM activity_scores");
      console.log(actScores);

      return res.json({ data: actScores.rows });
      // return res.status(500).json({
      //   message: "User id, act type id, and topic id must have a value",
      // });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Create a activity score
// params
// user_id int
// act_type_id int
// topic_id int
router.post("/", async (req, res) => {
  const body = req.body;

  const { user_id, act_type_id, topic_id, score } = body;

  try {
    if (user_id && act_type_id && topic_id && score) {
      const newActScore = await pool.query(
        "INSERT INTO activity_scores (act_type_id, user_id, topic_id, score) VALUES ($1, $2, $3, $4)",
        [act_type_id, user_id, topic_id, score]
      );

      console.log("new act score created: ", newActScore);
      return res.json({
        message: "Score created successfully.",
        success: newActScore.rowCount == 1,
      });
    } else {
      console.log(body);
      return res.status(500).json({
        message: `Body in POST new act score is not completed: ${body}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// const x = {
//   scores: {
//     tof: 20,
//     mcq: 20
//   },
//   topic_id: 1,
//   user_id: 1,
// }

// TODO Sum of scores and create total_scores
// TODO Get total_scores id and create reacords
// TODO of act_scores for TAP, MCQ and TOF

//
// Label of inp[uts ] in edit name
// Replace certificate on update of name

router.post("/total-scores", async (req, res) => {
  const { scores, topic_id, user_id, time_left } = req.body; // TODO: add time_left to app request

  const { tap, mcq, tof } = scores;

  if (tap == null || mcq == null || tof == null) {
    return res
      .json({ message: "One of the scores cannot be null" })
      .status(500);
  }

  try {
    await pool.query("BEGIN");

    const totalScore = tap + mcq + tof;
    const accuracy = (100 / 15) * totalScore; // Accuracy in percentage

    const q =
      "INSERT INTO total_scores (user_id, topic_id, total_score, accuracy, time_left) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const newTotalScores = await pool.query(q, [
      user_id,
      topic_id,
      totalScore,
      accuracy,
      time_left,
    ]);

    console.log(newTotalScores);

    const totalScoreId = newTotalScores.rows[0].id;

    console.log("TotalScore id: " + totalScoreId);

    // Create new act

    // id
    // act_type_id
    // user_id
    // topic_id
    // score
    // created_at
    // total_scores_id

    const newActScoreQuery =
      "INSERT INTO activity_scores (act_type_id, user_id, topic_id, total_scores_id, score) VALUES ($1, $2, $3, $4, $5)";
    const tapP = [1, user_id, topic_id, totalScoreId, tap];
    const newTapActScore = await pool.query(newActScoreQuery, tapP);

    const mcqP = [2, user_id, topic_id, totalScoreId, mcq];
    const newMcqActScore = await pool.query(newActScoreQuery, mcqP);

    const tofP = [3, user_id, topic_id, totalScoreId, tof];
    const newTofActScore = await pool.query(newActScoreQuery, tofP);

    await pool.query("COMMIT");

    console.log(
      newTapActScore.rows[0],
      newMcqActScore.rows[0],
      newTofActScore.rows[0]
    );

    // lets test this shit
    return res.json({
      message: "Act scores created successfully",
      success: true,
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

router.get("/total-scores", async (req, res) => {
  const total_scores_id = req.query.total_scores_id;

  try {
    const activity_scores = await getActivityScoresByTotalScoreId(
      total_scores_id
    );
    return res.json({ data: activity_scores });
  } catch (err) {
    return res.status(500).json({
      message: `Error in getting total-scores by total scores id: ${err}`,
    });
  }
});

module.exports = router;

// export a schema --> pg_dump -U your_username -h localhost -p 5432 -d your_database_name --schema-only > schema.sql
