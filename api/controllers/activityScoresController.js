const pool = require("../db");

const getActivityScoresByTotalScoreId = async (total_scores_id) => {
  console.log(total_scores_id);
  const q = "SELECT * FROM activity_scores WHERE total_scores_id=$1";
  const p = [total_scores_id];

  const activityScores = (await pool.query(q, p)).rows;
  // console.log("Activity scores: ", activityScores);

  return activityScores;
};

module.exports = { getActivityScoresByTotalScoreId };
