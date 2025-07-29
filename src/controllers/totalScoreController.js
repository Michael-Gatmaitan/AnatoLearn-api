const pool = require("../db");
const getTotalScores = async (user_id, topic_id) => {
  const q = "SELECT * FROM total_scores WHERE user_id=$1 AND topic_id=$2";
  const params = [user_id, topic_id];

  const totalScores = (await pool.query(q, params)).rows;

  return totalScores;
};

const getPassedScores = async (user_id, topic_id) => {
  const getQuery = `SELECT * FROM total_scores
    WHERE accuracy > 50 AND user_id=$1
    AND topic_id=$2 ORDER BY total_score LIMIT 1`;
  const params = [user_id, topic_id];

  console.log("Getting all passed scores");

  const result = await pool.query(getQuery, params);

  return result.rows;
};

module.exports = { getTotalScores, getPassedScores };
